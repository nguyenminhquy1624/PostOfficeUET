import {PropTypes} from 'prop-types'
// import map_img from "../assets/img/tmp_map.png"
import close_img from "../../assets/img/close.png"
import { useRef, useState } from 'react'
// import uuid from 'uuid'
const EditStorageAccountModal = props => {
    const accountInfo = props.accountProps
    const editAccount = props.editAccountFunc
    const closePage = props.closePageFunc
    let showEditForm = props.showEditFormProps

    const storageList = JSON.parse(localStorage.getItem("StorageStation"))
    const getStorage = (MaDiemTapKet) => {
        const ans = storageList.filter(storageInfo => (storageInfo.MaDiemTapKet === MaDiemTapKet))
        if (ans.length > 0)
            return ans[0]
        else 
            return null
    }
    const defaultStorageName = getStorage(accountInfo.MaDiemTapKet) ? getStorage(accountInfo.MaDiemTapKet).TenDiemTapKet : "không có dữ liệu"
    const [accountName, setAccountName] = useState(accountInfo.HoVaTen)
    const [accountPhoneNumber, setAccountPhoneNumber] = useState(accountInfo.SoDienThoai)
    const [accountEmail, setAccountEmail] = useState(accountInfo.Email)
    const [storageName, setStorageName] = useState(defaultStorageName)
    const [storageCode, setStorageCode] = useState(accountInfo.MaDiemTapKet)
    
    
   
    const accountNameRef = useRef(null)
    
    // const accountCodeRef = useRef(null)
    const accountPhoneNumberRef = useRef(null)
    const accountEmailRef = useRef(null)
    const storageNameRef = useRef(null)
    const confirmRef = useRef(null)

    const [accountPhoneNumberError, setAccountPhoneNumberError] = useState(true)
    const [accountEmailError, setAccountEmailError] = useState(true)

    const changeAccountName = event => {
        event.preventDefault();
        setAccountName(event.target.value)
    }
    const handleAccountNameDown = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (accountName.trim() !== "")
            accountPhoneNumberRef.current.focus();
        }
    }

    const phoneNumberRegex = /^\d{4,10}$/;
    const changeAccountPhoneNumber = event => {
        event.preventDefault();
        setAccountPhoneNumber(event.target.value)
    }
    const handleAccountPhoneNumberDown = event => {
        if(!phoneNumberRegex.test(accountPhoneNumber) && accountPhoneNumber.trim() !== "") {
            setAccountPhoneNumberError(false)
        }
        else {
            setAccountPhoneNumberError(true)
        }
        if (event.key === 'Enter') {
            event.preventDefault();
            if (accountPhoneNumber.trim() !== "" && accountPhoneNumberError)
            accountEmailRef.current.focus();
        }
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    const changeAccountEmail = event => {
        event.preventDefault();
        setAccountEmail(event.target.value)
    }
    const handleAccountEmailDown = event => {
        if(!emailRegex.test(accountEmail) && accountEmail.trim() !== "") {
            setAccountEmailError(false)
        }
        else {
            setAccountEmailError(true)
        }
        if (event.key === 'Enter') {
            event.preventDefault();
            if (accountEmail.trim() !== "" && accountEmailError)
            storageNameRef.current.focus();
        }
    }

    const changeStorageName = event => {
        event.preventDefault();
        setStorageName(event.target.value)
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
    
    // console.log(storageList)
    const filteredStorageList = storageList.filter(storageInfo =>  
        (storageInfo.DiaDiem.toLowerCase().includes(storageName.toLowerCase()) ||
        storageInfo.TenDiemTapKet.toLowerCase().includes(storageName.toLowerCase()))
    );
    // console.log(filteredStorageList)
    
    // const changeStorageCode = event => {
    //     event.preventDefault();
    //     setStorageCode(event.target.value)
    // }
    // const handleStorageCodeDown = event => {
    //     if (event.key === 'Enter') {
    //         event.preventDefault();
    //         confirmRef.current.focus();
    //     }
    // }

    const handleSubmit = event => {
        event.preventDefault()
        if (accountName.trim() !== "" &&
        accountPhoneNumber.trim() !== "" &&
        accountEmail.trim() !== "" &&
        storageName.trim() !== "" &&
        storageCode !== null && accountPhoneNumberError && accountEmailError) {
            editAccount({
                MaTaiKhoan: accountInfo.MaTaiKhoan,
                TenTaiKhoan: accountInfo.TenTaiKhoan,
                HoVaTen: accountName,
                SoDienThoai: accountPhoneNumber,
                Email: accountEmail,
                LoaiTaiKhoan: 4,
                MatKhau: "1",
                MaDiemTapKet: storageCode,
                MaDiemGiaoDich: null,   
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
        setAccountName(accountInfo.HoVaTen)
        setAccountPhoneNumber(accountInfo.SoDienThoai)
        setAccountEmail(accountInfo.Email)
        setStorageName(defaultStorageName)
        setStorageCode(accountInfo.MaDiemTapKet)
    }

    const handleClosePage = (event) => {
        event.preventDefault()
        closePage()
    }
  return (
    <div className={`fixed inset-0 flex justify-center items-center transition-colors ${showEditForm ? "bg-black/20" : "hidden"} z-50`}>
        {/* AddPage Modal */}
        <div className={`bg-white round-lg shadow mt-20 p-6 translate-all max-w-fit rounded-xl gap-4 ${showEditForm ? "scale-100 opacity-100" : "scale-100 opacity-0"} overflow-auto`} onClick={(e) => e.stopPropagation()}>
            <button onClick={handleClosePage} className='absolute top-2 right-2 py-1 px-1 h-10 w-10'>
                <img src={close_img}/>
            </button>
            <h1 className='font-bold text-4xl text-primary flex justify-center my-2'>
                CẬP NHẬT TÀI KHOẢN TRƯỞNG ĐIỂM TẬP KẾT
            </h1>
            <form className='' onSubmit={handleSubmit}>
                <div className='flex-col mx-2 my-2 text-primary py-0 space-y-1'>
                    <p>Họ và tên trường điểm tập kết</p>
                    <input className="w-full rounded-lg px-1 py-2 border-black text-black shadow-md" type='text' value={accountName} onChange={changeAccountName} ref={accountNameRef} onKeyDown={handleAccountNameDown} />
                    <p>Số điện thoại của trưởng điểm tập kết</p>
                    <input className="w-full rounded-lg px-1 py-2 border-black text-black shadow-md" type='text' value={accountPhoneNumber} onChange={changeAccountPhoneNumber} ref={accountPhoneNumberRef} onKeyDown={handleAccountPhoneNumberDown} />
                    <p>Email của trưởng điểm tập kết</p>
                    <input className="w-full rounded-lg px-1 py-2 border-black text-black shadow-md" type='text' value={accountEmail} onChange={changeAccountEmail} ref={accountEmailRef} onKeyDown={handleAccountEmailDown} />
                    <p>Địa chỉ/tên của điểm tập kết</p>
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
            </form>
        </div>
    </div>
  )
}

EditStorageAccountModal.propTypes = {
    accountProps: PropTypes.object.isRequired,
    editAccountFunc: PropTypes.func.isRequired,
    closePageFunc: PropTypes.func.isRequired,
    // showEditFormProps: PropTypes.object.isRequired
}
export default EditStorageAccountModal