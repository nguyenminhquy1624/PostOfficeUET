import {PropTypes} from 'prop-types'
// import map_img from "../assets/img/tmp_map.png"
import close_img from "../../assets/img/close.png"
import { useRef, useState } from 'react'
// import uuid from 'uuid'
const EditAccountModal = props => {
    const accountInfo = props.accountProps
    const editAccount = props.editAccountFunc
    const closePage = props.closePageFunc
    let showEditForm = props.showEditFormProps

    const [accountName, setAccountName] = useState(accountInfo.HoVaTen)
    const [accountEmail, setAccountEmail] = useState(accountInfo.Email)
    const [accountCode, setAccountCode] = useState(accountInfo.MaTaiKhoan)
    const [accountPhoneNumber, setAccountPhoneNumber] = useState(accountInfo.SoDienThoai)
    const [storageCode, setStorageCode] = useState(accountInfo.MaDiemGiaoDich)
    
    
   
    const accountNameRef = useRef(null)
    const accountEmailRef = useRef(null)
    const accountCodeRef = useRef(null)
    const accountPhoneNumberRef = useRef(null)
    const storageCodeRef = useRef(null)
    const confirmRef = useRef(null)

    const changeAccountName = event => {
        event.preventDefault();
        setAccountName(event.target.value)
    }
    const handleAccountNameDown = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            accountEmailRef.current.focus();
        }
    }

    const changeAccountEmail = event => {
        event.preventDefault();
        setAccountEmail(event.target.value)
    }
    const handleAccountEmailDown = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            accountCodeRef.current.focus();
        }
    }

    const changeAccountCode = event => {
        event.preventDefault();
        setAccountCode(event.target.value)
    }
    const handleAccountCodeDown = event => {
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
            storageCodeRef.current.focus();
        }
    }

    const changeStorageCode = event => {
        event.preventDefault();
        setStorageCode(event.target.value)
    }
    const handleStorageCodeDown = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            confirmRef.current.focus();
        }
    }

    const handleSubmit = event => {
        event.preventDefault()
        editAccount({
            TenTaiKhoan: accountInfo.TenTaiKhoan,
            HoVaTen: accountName,
            MaTaiKhoan: accountInfo.MaTaiKhoan,
            MaDiemTapKet: "",
            MaDiemGiaoDich: storageCode,
            MatKhau: accountInfo.MatKhau,
            SoDienThoai: accountPhoneNumber,
            Email:accountInfo.Email,
            LoaiTaiKhoan: 2,
            NgaySinh: accountInfo.NgaySinh,    
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
        setAccountName(accountInfo.HoVaTen)
        setAccountEmail(accountInfo.Email)
        setAccountCode(accountInfo.MaTaiKhoan)
        setAccountPhoneNumber(accountInfo.SoDienThoai)
        setStorageCode(accountInfo.MaDiemGiaoDich)
    }

    const handleClosePage = (event) => {
        event.preventDefault()
        closePage()
    }
  return (
    <div className={`fixed inset-0 flex justify-center items-center transition-colors ${showEditForm ? "bg-black/20" : "hidden"} z-50`}>
        {/* AddPage Modal */}
        <div className={`bg-white round-lg shadow mt-20 p-6 translate-all max-w-md rounded-xl gap-4 ${showEditForm ? "scale-100 opacity-100" : "scale-100 opacity-0"} overflow-auto`} onClick={(e) => e.stopPropagation()}>
            <button onClick={handleClosePage} className='absolute top-2 right-2 py-1 px-1 h-10 w-10'>
                <img src={close_img}/>
            </button>
            <h1 className='font-bold text-4xl text-primary flex justify-center my-2'>
                CẬP NHẬT TÀI KHOẢN TRƯỞNG ĐIỂM GIAO DỊCH
            </h1>
            <form className='' onSubmit={handleSubmit}>
                <div className='flex-col mx-2 my-2 text-primary py-0 space-y-1'>
                    <p>Họ và tên trường điểm giao dịch</p>
                    <input className="w-full rounded-lg px-1 py-2 border-black text-black shadow-md" type='text' value={accountName} onChange={changeAccountName} ref={accountNameRef} onKeyDown={handleAccountNameDown} />
                    <p>Email của trưởng điểm giao dịch</p>
                    <input className="w-full rounded-lg px-1 py-2 border-black text-black shadow-md" type='text' value={accountEmail} onChange={changeAccountEmail} ref={accountEmailRef} onKeyDown={handleAccountEmailDown} />
                    <p>Mã tài khoản của trưởng điểm giao dịch</p>
                    <input className="w-full rounded-lg px-1 py-2 border-black text-black shadow-md" type='text' value={accountCode} onChange={changeAccountCode} ref={accountCodeRef} onKeyDown={handleAccountCodeDown} />
                    <p>Số điện thoại của trưởng điểm giao dịch</p>
                    <input className="w-full rounded-lg px-1 py-2 border-black text-black shadow-md" type='text' value={accountPhoneNumber} onChange={changeAccountPhoneNumber} ref={accountPhoneNumberRef} onKeyDown={handleAccountPhoneNumberDown} />
                    <p>Mã của điểm giao dịch</p>
                    <input className="w-full rounded-lg px-1 py-2 border-black text-black shadow-md" type='text' value={storageCode} onChange={changeStorageCode} ref={storageCodeRef} onKeyDown={handleStorageCodeDown} />
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

EditAccountModal.propTypes = {
    accountProps: PropTypes.object.isRequired,
    editAccountFunc: PropTypes.func.isRequired,
    closePageFunc: PropTypes.func.isRequired,
    // showEditFormProps: PropTypes.object.isRequired
}
export default EditAccountModal