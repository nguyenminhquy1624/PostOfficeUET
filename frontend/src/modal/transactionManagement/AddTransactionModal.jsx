import {PropTypes} from 'prop-types'
// import map_img from "../assets/img/tmp_map.png"
import close_img from "../../assets/img/close.png"
import { useRef, useState } from 'react'
// import uuid from 'uuid'

const AddTransactionModal = props => {
    const addTransaction = props.addTransactionFunc
    const closePage = props.closePageFunc
    let showAddForm = props.addFormProps
    const [transactionName, setTransactionName] = useState("")
    const [transactionLocation, setTransactionLocation] = useState("")
    const [transactionHotline, setTransactionHotline] = useState("")
    const [storageName, setStorageName] = useState("")
    const [storageCode, setStorageCode] = useState(null)
    
    const [transactionHotlineError, setTransactionHotlineError] = useState(true)

    const storageList = JSON.parse(localStorage.getItem("StorageStation")
)
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
        setTransactionHotline(event.target.value)
        setStorageCode(null)
    }
    const handleStorageNameDown = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (storageName.trim() !== "" && storageCode !== null)
            confirmRef.current.focus();
        }
    }

    const handleStorageInfoClick = (event, storageInfo) => {
        event.preventDefault()
        setStorageName(storageInfo.TenDiemTapKet)
        setStorageCode(storageInfo.MaDiemTapKet)
    }

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
            addTransaction({
                TenDiemGiaoDich: transactionName,
                DiaDiem: transactionLocation,
                MaDiemGiaoDich: 745424,
                MaDiemTapKet: storageCode,
                Hotline: transactionHotline,    
            })
        }
        else {
            alert("Dữ liệu nhập vào không hợp lệ hoặc bị thiếu")
        }
    }

    const handleReset = (event) => {
        event.preventDefault()
        setTransactionName("")
        setTransactionLocation("")
        setTransactionHotline("")
        setStorageName("")
        setStorageCode(null)
    }
    const handleClosePage = (event) => {
        event.preventDefault()
        closePage()
    }
  return (
    <div className={`fixed inset-0 flex justify-center items-center transition-colors ${showAddForm ? "bg-black/20" : "hidden"} z-50`}>
        {/* AddPage Modal */}
        <div className={`bg-white round-lg shadow p-6 translate-all max-w-md rounded-xl gap-4 ${showAddForm ? "scale-100 opacity-100" : "scale-100 opacity-0"}`} onClick={(e) => e.stopPropagation()}>
            <button onClick={handleClosePage} className='absolute top-2 right-2 py-1 px-1 h-10 w-10'>
                <img src={close_img}/>
            </button>
            <h1 className='font-bold text-3xl text-primary flex justify-center my-2'>
                TẠO ĐIỂM GIAO DỊCH
            </h1>
            <form className='' onSubmit={handleSubmit}>
                <div className='flex-col mx-2 my-2 text-primary py-0 space-y-1'>
                    <p>Tên điểm giao dịch</p>
                    <input className="w-full rounded-lg px-3 py-3 border-black text-primary shadow-md" type='text' value={transactionName} onChange={changeTransactionName} ref={transactionNameRef} onKeyDown={handleTransactionNameDown} placeholder='Điền tên điểm giao dịch...'/>
                    <p>Địa chỉ điểm giao dịch</p>
                    <input className="w-full rounded-lg px-3 py-3 border-black text-primary shadow-md" type='text' value={transactionLocation} onChange={changeTransactionLocation} ref={transactionLocationRef} onKeyDown={handleTransactionLocationDown} placeholder='Điền dịa chỉ điểm giao dịch...'/>
                    <p>Hotline</p>
                    <input className="w-full rounded-lg px-3 py-3 border-black text-primary shadow-md" type='text' value={transactionHotline} onChange={changeTransactionHotline} ref={transactionHotlineRef} onKeyDown={handleTransactionHotlineDown} placeholder='Điền Hotline của điểm giao dịch...'/>
                    {!transactionHotlineError && <p className='text-red-600'>Cần nhập số điện thoại chứa từ 4 đến 10 chữ số</p>}
                    <p>Địa chỉ/tên điểm tập kết trực thuộc </p>
                    <input className="w-full rounded-lg px-3 py-3 border-black text-primary shadow-md" type='text' value={storageName} onChange={changeStorageName} ref={storageNameRef} onKeyDown={handleStorageNameDown} placeholder='Điền địa chỉ/tên của điểm tập kết trực thuộc...'/>
                    <div 
                    className='border-2 rounded-lg '
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
                        <button className='w-fit rounded-sm px-2 py-2 hover:scale-125 transition ease-out duration-500 ' onClick={handleReset}>Reset</button>
                        <button className='w-fit rounded-sm px-2 py-2 hover:scale-125 transition ease-out duration-500 ' ref={confirmRef} type='submit'>Xác nhận</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

AddTransactionModal.propTypes = {
    addTransactionFunc: PropTypes.func.isRequired,
    closePageFunc: PropTypes.func.isRequired,
    // addFormProps: PropTypes.object.isRequired
}
export default AddTransactionModal