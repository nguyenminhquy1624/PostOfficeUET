import {PropTypes} from 'prop-types'
// import map_img from "../assets/img/tmp_map.png"
import close_img from "../../assets/img/close.png"
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
// import uuid from 'uuid'
const EditTransactionModal = props => {
    const transactionInfo = props.transactionProps
    const editTransaction = props.editTransactionFunc
    const closePage = props.closePageFunc
    let showEditForm = props.showEditFormProps

    
    // const storageList = JSON.parse(localStorage.getItem("StorageStation"))

    const [storageList, setStorageList] = useState([])
    useEffect(() => {
        const getStorage = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/diemtapket/all/")
                console.log("get data in edit: ", res.data['Diem Tap Ket'])
                setStorageList(res.data['Diem Tap Ket'])
            } catch (error) {
                console.log("error: ", error.message);
            }
        }
        getStorage();
    }, [])

    const getStorage = (MaDiemTapKet) => {
        const ans = storageList.filter(storageInfo => (storageInfo.MaDiemTapKet === MaDiemTapKet))
        if (ans.length > 0)
            return ans[0]
        else 
            return null
    }
    // console.log("transaction: ", getStorage(transactionInfo.MaDiemTapKet))
    let defaultStorageName = "không có dữ liệu"
    if (getStorage(transactionInfo.MaDiemTapKet) !== null) {
        defaultStorageName = getStorage(transactionInfo.MaDiemTapKet).TenDiemTapKet
    }
    console.log("transaction: ", defaultStorageName)
    const [transactionName, setTransactionName] = useState(transactionInfo.TenDiaDiemGiaoDich)
    const [transactionLocation, setTransactionLocation] = useState(transactionInfo.DiaDiem)
    const [transactionHotline, setTransactionHotline] = useState(transactionInfo.Hotline)
    const [storageName, setStorageName] = useState(defaultStorageName)
    const [storageCode, setStorageCode] = useState(transactionInfo.MaDiemTapKet)

    console.log("storageName: ", )

    const [transactionHotlineError, setTransactionHotlineError] = useState(true)

    const transactionNameRef = useRef(null)
    const transactionLocationRef = useRef(null)
    const transactionHotlineRef = useRef(null)
    const storageNameRef = useRef(null)
    const confirmRef = useRef(null)

    const changeTransactionName = event => {
        event.preventDefault();
        setTransactionName(event.target.value)
    }
    const handleTransactionNameDown = event => {
        
        if (event.key === 'Enter') {
            event.preventDefault();
            if (transactionName.trim() !== "")
            transactionLocationRef.current.focus();
        }
    }

    const changeTransactionLocation = event => {
        event.preventDefault();
        setTransactionLocation(event.target.value)
    }
    const handleTransactionLocationDown = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (transactionLocation.trim() !== "")
            transactionHotlineRef.current.focus();
        }
    }

    const hotlineRegex = /^\d{4,10}$/;
    const changeTransactionHotline = event => {
        event.preventDefault();
        setTransactionHotline(event.target.value)
    }
    const handleTransactionHotlineDown = event => {
        if (transactionHotline.trim() !== "" && !hotlineRegex.test(transactionHotline)) {
            setTransactionHotlineError(false)
        }
        else {
            setTransactionHotlineError(true)
        }
        if (event.key === 'Enter') {
            event.preventDefault();
            if (transactionHotline.trim() != "" && transactionHotlineError)
            storageNameRef.current.focus();
        }
    }

    const changeStorageName = event => {
        event.preventDefault();
        setStorageName(event.target.value)
    }
    const handleStorageNameDown = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (transactionLocation.trim() !== "")
            confirmRef.current.focus();
        }
    }

    const handleStorageInfoClick = (event, storageInfo) => {
        event.preventDefault()
        setStorageName(storageInfo.TenDiemTapKet)
        setStorageCode(storageInfo.MaDiemTapKet)

    }
    
    // console.log(storageList)
    const filteredStorageList = storageList.filter(storageInfo =>  
        (storageInfo.DiaDiem.toLowerCase().includes(storageName.toLowerCase()) ||
        storageInfo.TenDiemTapKet.toLowerCase().includes(storageName.toLowerCase()))
    );

    const handleSubmit = event => {
        event.preventDefault()
        if (transactionName.trim() !== "" &&
            transactionLocation.trim() !== "" &&
            transactionHotline.trim() !== "" &&
            storageName.trim() !== "" &&
            storageCode !== null &&
            transactionHotlineError === true) {
            editTransaction(transactionInfo.MaDiemGiaoDich ,{
                TenDiaDiemGiaoDich: transactionName,
                DiaDiem: transactionLocation,
                Hotline: transactionHotline,
                MaDiemTapKet: storageCode,
            })
        }
        else {
            alert("Dữ liệu nhập vào không hợp lệ hoặc bị thiếu")
        }
    }

    // const handleConfirmDown = event => {
    //     if (event.key === 'Enter') {
    //         event.preventDefault();
    //         handleSubmit(event)
    //     }
    // }
    const handleReset = (event) => {
        event.preventDefault()
        setTransactionName(transactionInfo.TenDiaDiemGiaoDich)
        setTransactionLocation(transactionInfo.DiaDiem)
        setTransactionHotline(transactionInfo.Hotline)
        setStorageName(defaultStorageName)
        setStorageCode(transactionInfo.MaDiemTapKet)
    }

    const handleClosePage = (event) => {
        event.preventDefault()
        closePage()
    }

    
  return (
    <div className={`fixed inset-0 flex justify-center items-center transition-colors ${showEditForm ? "bg-black/20" : "hidden"} z-50`}>
        {/* AddPage Modal */}
        <div className={`bg-white round-lg shadow p-6 translate-all max-w-md rounded-xl gap-4 ${showEditForm ? "scale-100 opacity-100" : "scale-100 opacity-0"}`} onClick={(e) => e.stopPropagation()}>
            <button onClick={handleClosePage} className='absolute top-2 right-2 py-1 px-1 h-10 w-10'>
                <img src={close_img}/>
            </button>
            <h1 className='font-bold text-2xl text-primary flex justify-center my-2'>
                CẬP NHẬT ĐIỂM GIAO DỊCH 
            </h1>
            <form className='' onSubmit={handleSubmit}>
                <div className='flex-col mx-2 my-2 text-primary py-0 space-y-1'>
                    <p>Tên điểm giao dịch</p>
                    <input className="w-full rounded-lg px-1 py-2 border-black text-black shadow-md" type='text' value={transactionName} onChange={changeTransactionName} ref={transactionNameRef} onKeyDown={handleTransactionNameDown} placeholder='Điền tên điểm giao dịch...'/>
                    <p>Địa chỉ điểm giao dịch</p>
                    <input className="w-full rounded-lg px-1 py-2 border-black text-black shadow-md" type='text' value={transactionLocation} onChange={changeTransactionLocation} ref={transactionLocationRef} onKeyDown={handleTransactionLocationDown} placeholder='Điền dịa chỉ điểm giao dịch...'/>
                    <p>Hotline</p>
                    <input className="w-full rounded-lg px-1 py-2 border-black text-black shadow-md" type='text' value={transactionHotline} onChange={changeTransactionHotline} ref={transactionHotlineRef} onKeyDown={handleTransactionHotlineDown} placeholder='Điền Hotline của điểm giao dịch...'/>
                    {!transactionHotlineError && <p className='text-red-600'>Cần nhập số điện thoại chứa từ 4 đến 10 chữ số</p>}
                    <p>Địa chỉ/tên của điểm tập kết trực thuộc</p>
                    <input className="w-full rounded-lg px-1 py-2 border-black text-black shadow-md" type='text' value={storageName} onChange={changeStorageName} ref={storageNameRef} onKeyDown={handleStorageNameDown} />
                    <div 
                    className='border-2 rounded-lg'
                    style={{ height: "160px", overflowY: "auto" }}>
                    {filteredStorageList?.length > 0 ? 
                        <ul>
                        {filteredStorageList.map(storageInfo => (
                            <div 
                            key={storageInfo.MaDiemTapKet} 
                            className='m-1 rounded-md text-primary justify-start p-1 w-full border-b-2 cursor-pointer'
                            onClick={(e) => handleStorageInfoClick(e, storageInfo)}>
                                <p className="">{storageInfo.TenDiemTapKet}</p> 
                                <p className='italic text-[10px]'>{storageInfo.DiaDiem}</p>
                            </div>
                        ))}
                        </ul> :
                        <p>Không tìm thấy điểm tập kết phù hợp</p> 
                    }
                    </div>
                    <div className='flex justify-around gap-4 text-primary text-xl'>
                        <button className='w-fit rounded-sm px-2 py-2 hover:scale-125 transition ease-out duration-500  ' onClick={handleReset}>Reset</button>
                        <button className='w-fit rounded-sm px-2 py-2 hover:scale-125 transition ease-out duration-500 ' ref={confirmRef} type='submit'>Xác nhận</button>
                    </div>
                </div>
                {/* <div className='block text-xl text-black'>
                    <p className='font-bold flex justify-center'>Chọn vị trí trên bản đồ</p>
                    <img src={map_img} className='w-fit' />
                    <div className='flex justify-around align-middle'>
                        <button className='w-fit rounded-sm px-2 py-2 hover:scale-125 transition ease-out duration-500  ' onClick={handleReset}>Reset</button>
                        <button className='w-fit rounded-sm px-2 py-2 hover:scale-125 transition ease-out duration-500 ' ref={confirmRef} type='submit'>Xác nhận</button>
                    </div>
                </div> */}
            </form>
        </div>
    </div>
  )
}

EditTransactionModal.propTypes = {
    transactionProps: PropTypes.object.isRequired,
    editTransactionFunc: PropTypes.func.isRequired,
    closePageFunc: PropTypes.func.isRequired,
    // showEditFormProps: PropTypes.object.isRequired
}
export default EditTransactionModal