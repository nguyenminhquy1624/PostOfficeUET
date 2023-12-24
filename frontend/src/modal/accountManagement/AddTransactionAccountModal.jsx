import {PropTypes} from 'prop-types'
// import map_img from "../assets/img/tmp_map.png"
import close_img from "../../assets/img/close.png"
import { useRef, useState } from 'react'
// import uuid from 'uuid'
const AddTransactionAccountModal = props => {
    const addAccount = props.addAccountFunc
    const closePage = props.closePageFunc
    let showAddForm = props.addFormProps

    const transactionList = JSON.parse(localStorage.getItem("TransactionStation"))
    const [accountName, setAccountName] = useState('')
    const [accountPhoneNumber, setAccountPhoneNumber] = useState("")
    const [accountEmail, setAccountEmail] = useState("")
    const [transactionName, setTransactionName] = useState("")
    const [transactionCode, setTransactionCode] = useState(null)
    
    const accountNameRef = useRef(null)
    const accountPhoneNumberRef = useRef(null)
    const accountEmailRef = useRef(null)
    const transactionNameRef = useRef(null)
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
            if(accountPhoneNumberError && accountPhoneNumber.trim() !== "")
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
            if(accountEmailError && accountEmail.trim() !== "")
            transactionNameRef.current.focus();
        }
    }

    const changeTransactionName = event => {
        event.preventDefault();
        setTransactionName(event.target.value)
        setTransactionCode(null)
    }
    const handleTransactionNameDown = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (transactionName.trim() !== "" && transactionCode !== null)
            confirmRef.current.focus();
        }
    }

    const handleTransactionInfoClick = (event, transactionInfo) => {
        event.preventDefault()
        setTransactionName(transactionInfo.TenDiemGiaoDich)
        setTransactionCode(transactionInfo.MaDiemGiaoDich)

    }
    // console.log(transactionList)
    const filteredTransactionList = transactionList.filter(transactionInfo =>  
        (transactionInfo.DiaDiem.toLowerCase().includes(transactionName.toLowerCase()) ||
        transactionInfo.TenDiemGiaoDich.toLowerCase().includes(transactionName.toLowerCase()))
    );

    const handleSubmit = event => {
        event.preventDefault()
        if (accountName.trim() !== "" &&
        accountPhoneNumber.trim() !== "" &&
        accountEmail.trim() !== "" &&
        transactionName.trim() !== "" &&
        transactionCode !== null && accountPhoneNumberError && accountEmailError) {
            const xxid = 5
            const accountNickName = `truongGiaoDich${xxid}`
            addAccount({
                MaTaiKhoan: xxid,
                TenTaiKhoan: accountNickName,
                HoVaTen: accountName,
                SoDienThoai: accountPhoneNumber,
                Email: accountEmail,
                LoaiTaiKhoan: 2,
                MatKhau: "1",
                MaDiemTapKet: null,
                MaDiemGiaoDich: transactionCode,
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
        setAccountName('')
        setAccountPhoneNumber("")
        setAccountEmail("")
        setTransactionName("")
        setTransactionCode(null)

    }

    const handleClosePage = (event) => {
        event.preventDefault()
        closePage()
    }
  return (
    <div className={`fixed inset-0 flex justify-center items-center transition-colors ${showAddForm ? "bg-black/20" : "hidden"} z-50`}>
        {/* AddPage Modal */}
        <div className={`bg-white round-lg shadow mt-20 p-6 translate-all max-w-fit rounded-xl gap-4 overflow-auto ${showAddForm ? "scale-100 opacity-100" : "scale-100 opacity-0"} overflow-auto`} onClick={(e) => e.stopPropagation()}>
            <button onClick={handleClosePage} className='absolute top-2 right-2 py-1 px-1 h-10 w-10'>
                <img src={close_img}/>
            </button>
            <h1 className='font-bold text-4xl text-primary flex justify-center my-2'>
                TẠO TÀI KHOẢN TRƯỞNG ĐIỂM GIAO DỊCH
            </h1>
            <form className='' onSubmit={handleSubmit}>
                <div className='flex-col mx-2 my-2 text-primary py-0 space-y-1'>
                    <p>Họ và tên của trường điểm giao dịch</p>
                    <input className="w-full rounded-lg px-1 py-2 border-black text-black shadow-md" type='text' value={accountName} onChange={changeAccountName} ref={accountNameRef} onKeyDown={handleAccountNameDown} placeholder='Điền họ và tên của trưởng điểm giao dịch...'/>
                    <p>Số điện thoại của trưởng điểm giao dịch</p>
                    <input className="w-full rounded-lg px-1 py-2 border-black text-black shadow-md" type='text' value={accountPhoneNumber} onChange={changeAccountPhoneNumber} ref={accountPhoneNumberRef} onKeyDown={handleAccountPhoneNumberDown} placeholder='Điền mã của trưởng giao dịch...'/>
                    {!accountPhoneNumberError && <p className='text-red-600'>Cần nhập số điện thoại chứa từ 4 đến 10 chữ số</p>}
                    <p>Email của trưởng điểm giao dịch</p>
                    <input className="w-full rounded-lg px-1 py-2 border-black text-black shadow-md" type='text' value={accountEmail} onChange={changeAccountEmail} ref={accountEmailRef} onKeyDown={handleAccountEmailDown} placeholder='Điền mã của trưởng giao dịch...'/>
                    {!accountEmailError && <p className='text-red-600'>Email không đúng định dạng</p>}
                    <p>Địa chỉ/tên điểm giao dịch</p>
                    <input className="w-full rounded-lg px-1 py-2 border-black text-black shadow-md" type='text' value={transactionName} onChange={changeTransactionName} ref={transactionNameRef} onKeyDown={handleTransactionNameDown} placeholder='Điền dịa chỉ hoặc tên của điểm giao dịch...'/>
                    <div 
                    className='border-2 rounded-lg '
                    style={{ height: "160px", overflowY: "auto" }}>
                    {filteredTransactionList?.length > 0 ? 
                        <ul>
                        {filteredTransactionList.map(transactionInfo => (
                            <div 
                            key={transactionInfo.MaDiemGiaoDich} 
                            className='m-1 rounded-md text-primary justify-start p-1 w-full border-b-2 cursor-pointer'
                            onClick={(e) => handleTransactionInfoClick(e, transactionInfo)}>
                                <p className="">{transactionInfo.TenDiemGiaoDich}</p> 
                                <p className='italic text-[10px]'>{transactionInfo.DiaDiem}</p>
                            </div>
                        ))}
                        </ul> :
                        <p>Không tìm thấy điểm giao dịch phù hợp</p> 
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

AddTransactionAccountModal.propTypes = {
    addAccountFunc: PropTypes.func.isRequired,
    closePageFunc: PropTypes.func.isRequired,
    // addFormProps: PropTypes.object.isRequired
}
export default AddTransactionAccountModal