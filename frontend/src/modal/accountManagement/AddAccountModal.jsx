import {PropTypes} from 'prop-types'
// import map_img from "../assets/img/tmp_map.png"
import close_img from "../../assets/img/close.png"
import { useRef, useState } from 'react'
// import uuid from 'uuid'
const AddAccountModal = props => {
    const addAccount = props.addAccountFunc
    const closePage = props.closePageFunc
    let showAddForm = props.addFormProps

    const storageList = [
        {
            TenDiemGiaoDich: "Điểm giao dịch Cầu Giấy 1",
            MaDiemGiaoDich: 12345,
            MaTruongDiem: 1234,
            DiaDiem: "Số 4 Xuân Thủy, Hà Nội",
            Hotline: 15214,
        },
        {
            TenDiemGiaoDich: "Điểm giao dịch Cầu Giấy 2",
            MaDiemGiaoDich: 12346,
            MaTruongDiem: 1235,
            DiaDiem: "Số 5 Xuân Thủy, Hà Nội",
            Hotline: 15215,
        },
        {
            TenDiemGiaoDich: "Điểm giao dịch Cầu Giấy 3",
            MaDiemGiaoDich: 12347,
            MaTruongDiem: 1236,
            DiaDiem: "Số 6 Xuân Thủy, Hà Nội",
            Hotline: 15216,
        },
        {
            TenDiemGiaoDich: "Điểm giao dịch Bắc Từ Liêm",
            MaDiemGiaoDich: 12348,
            MaTruongDiem: 1237,
            DiaDiem: "Số 4 đường Cầu Diễn, Hà Nội",
            Hotline: 15217,
        },
        {
            TenDiemGiaoDich: "Điểm giao dịch Hoài Đức",
            MaDiemGiaoDich: 12349,
            MaTruongDiem: 1238,
            DiaDiem: "Xã Kim Chung, huyện Hoài Đức, Hà Nội",
            Hotline: 15219,
        },
        {
            TenDiemGiaoDich: "Điểm giao dịch Đống Đa",
            MaDiemGiaoDich: 12350,
            MaTruongDiem: 1239,
            DiaDiem: "Số 5 Đống Đa, Hà Nội",
            Hotline: 15218,
        },
    ]
    const [accountName, setAccountName] = useState('')
    const [accountDOB, setAccountDOB] = useState("")
    const [accountPhoneNumber, setAccountPhoneNumber] = useState("")
    const [storageName, setStorageName] = useState("")
    const [storageCode, setStorageCode] = useState("")
    
    const accountNameRef = useRef(null)
    const accountDOBRef = useRef(null)
    const accountPhoneNumberRef = useRef(null)
    const storageNameRef = useRef(null)
    const confirmRef = useRef(null)

    const changeAccountName = event => {
        event.preventDefault();
        setAccountName(event.target.value)
    }
    const handleAccountNameDown = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            accountDOBRef.current.focus();
        }
    }

    const changeAccountDOB = event => {
        event.preventDefault();
        setAccountDOB(event.target.value)
    }
    const handleAccountDOBDown = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            accountPhoneNumberRef.current.focus();
        }
    }

    const changeAccountPhoneNumber = event => {
        event.preventDefault();
        setAccountPhoneNumber(event.target.value)
    }
    const handleAccountPhoneNumberDown = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
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
            confirmRef.current.focus();
        }
    }

    const handleStorageInfoClick = (event, storageInfo) => {
        event.preventDefault()
        setStorageName(storageInfo.TenDiemGiaoDich)
        setStorageCode(storageInfo.MaDiemGiaoDich)

    }
    const filteredStorageList = storageList.filter(storageInfo =>  
        (storageInfo.DiaDiem.toLowerCase().includes(storageName.toLowerCase()) ||
        storageInfo.TenDiemGiaoDich.toLowerCase().includes(storageName.toLowerCase()))
    );


    const handleSubmit = event => {
        event.preventDefault()
        const xxid = '5'
        const accountNickName = `truongGiaoDich${xxid}`
        addAccount({
            TenTaiKhoan: accountNickName,
            HoVaTen: accountName,
            MaTaiKhoan: xxid,
            MaDiemTapKet: "",
            MaDiemGiaoDich: storageCode,
            MatKhau: "1",
            SoDienThoai: accountPhoneNumber,
            Email: `${xxid}@gmail.com`,
            LoaiTaiKhoan: 2,
            NgaySinh: accountDOB,

        })
    }

    // const handleConfirmDown = event => {
    //     if (event.key === 'Enter') {
    //         event.preventDefault();
    //         handleSubmit(event)
    //     }
    // }
    const handleReset = (event) => {
        event.preventDefault()
        setAccountName('')
        setAccountDOB("")
        setAccountPhoneNumber("")
        setStorageName("")
        setStorageCode("")

    }

    const handleClosePage = (event) => {
        event.preventDefault()
        closePage()
    }
  return (
    <div className={`fixed inset-0 flex justify-center items-center transition-colors ${showAddForm ? "bg-black/20" : "hidden"} z-50`}>
        {/* AddPage Modal */}
        <div className={`bg-white round-lg shadow p-6 translate-all max-w-md rounded-xl gap-4 ${showAddForm ? "scale-100 opacity-100" : "scale-100 opacity-0"}`} onClick={(e) => e.stopPropagation()}>
            <button onClick={handleClosePage} className='absolute top-2 right-2 py-1 px-2 h-10 w-10'>
                <img src={close_img}/>
            </button>
            <h1 className='font-bold text-4xl text-primary flex justify-center my-2'>
                TẠO TÀI KHOẢN TRƯỞNG ĐIỂM
            </h1>
            <form className='' onSubmit={handleSubmit}>
                <div className='flex-col mx-2 my-2 text-primary py-0 space-y-1'>
                    <p>Họ và tên của trường điểm giao dịch</p>
                    <input className="w-full rounded-lg px-1 py-2 border-black text-black shadow-md" type='text' value={accountName} onChange={changeAccountName} ref={accountNameRef} onKeyDown={handleAccountNameDown} placeholder='Điền họ và tên của trưởng điểm giao dịch...'/>
                    <p>Ngày sinh của trường điểm giao dịch</p>
                    <input className="w-full rounded-lg px-1 py-2 border-black text-black shadow-md" type='text' value={accountDOB} onChange={changeAccountDOB} ref={accountDOBRef} onKeyDown={handleAccountDOBDown} placeholder='Điền ngày sinh của trưởng điểm giao dịch...'/>
                    <p>Số điện thoại của trưởng điểm giao dịch</p>
                    <input className="w-full rounded-lg px-1 py-2 border-black text-black shadow-md" type='text' value={accountPhoneNumber} onChange={changeAccountPhoneNumber} ref={accountPhoneNumberRef} onKeyDown={handleAccountPhoneNumberDown} placeholder='Điền mã của trưởng giao dịch...'/>
                    <p>Địa chỉ điểm giao dịch</p>
                    <input className="w-full rounded-lg px-1 py-2 border-black text-black shadow-md" type='text' value={storageName} onChange={changeStorageName} ref={storageNameRef} onKeyDown={handleStorageNameDown} placeholder='Điền dịa chỉ điểm giao dịch...'/>
                    <div 
                    className='border-2 rounded-lg'
                    style={{ height: "160px", overflowY: "auto" }}>
                        <ul>
                            {filteredStorageList.map(storageInfo => (
                                <div 
                                key={storageInfo.MaDiemGiaoDich} 
                                className='m-1 rounded-md text-primary justify-start p-1 w-full border-b-2'
                                onClick={(e) => handleStorageInfoClick(e, storageInfo)}>
                                    <p className="">{storageInfo.TenDiemGiaoDich}</p> 
                                    <p className='italic text-[10px]'>{storageInfo.DiaDiem}</p>
                                </div>
                            ))}
                        </ul>
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

AddAccountModal.propTypes = {
    addAccountFunc: PropTypes.func.isRequired,
    closePageFunc: PropTypes.func.isRequired,
    // addFormProps: PropTypes.object.isRequired
}
export default AddAccountModal