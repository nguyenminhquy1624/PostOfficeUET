import { PropTypes } from 'prop-types'
// import map_img from "../assets/img/tmp_map.png"
import close_img from "../../assets/img/close.png"
import { useRef, useState , useEffect} from 'react'
import axios from 'axios'
// import uuid from 'uuid'
const EditStafModal = props => {
    const accountInfo = props.accountProps
    const editAccount = props.editAccountFunc
    const closePage = props.closePageFunc
    let showEditForm = props.showEditFormProps
    const isStorage = props.isStorageProps


    const [accountName, setAccountName] = useState(accountInfo.HoVaTen)
    const [accountPhoneNumber, setAccountPhoneNumber] = useState(accountInfo.SoDienThoai)
    const [accountEmail, setAccountEmail] = useState(accountInfo.email)
    const [isStorageStaff, setIsStorageStaff] = useState(isStorage)
    const [defaultUnitList, setDefaultUnitList] = useState([])
    const [unitName, setUnitName] = useState("")
    const [storageCode, setStorageCode] = useState(accountInfo.MaDiemTapKet)
    const [transactionCode, setTransactionCode] = useState(accountInfo.MaDiemGiaoDich)

    const [secondDefaultList, setSecondDefaultList] = useState([])
    // const unit = isStorage ? "StorageStation" : "TransactionStation"
    // const defaultUrl = isStorage ? "http://127.0.0.1:8000/api/diemtapket/" : "http://127.0.0.1:8000/api/diemgiaodich/"


    useEffect (() => {
    
        const getUnitList = async () => {
            const defaultUrl = isStorage ? "http://127.0.0.1:8000/api/diemtapket/all/" : "http://127.0.0.1:8000/api/diemgiaodich/all/"
            const getField = isStorage ? "Diem Tap Ket" : "Diem Giao Dich"

            const secondDefaultUrl = !isStorage ? "http://127.0.0.1:8000/api/diemtapket/all/" : "http://127.0.0.1:8000/api/diemgiaodich/all/"
            const secondGetField = !isStorage ? "Diem Tap Ket" : "Diem Giao Dich"
            try {
                const response = await axios.get(defaultUrl)
                console.log("get data: ", response.data)
                setDefaultUnitList(response.data[getField])
            } catch (err) {
                console.log("staff err: ", err)
            }
            try {
                const response = await axios.get(secondDefaultUrl)
                console.log("get trans data: ", response.data)
                setSecondDefaultList(response.data[secondGetField])
            } catch (err) {
                console.log("staff err: ", err)
            }

        }
        getUnitList()
    }, [isStorage])

    const [defaultUnitName, setDefaultUnitName] = useState("")
    useEffect (() => {
        const getDefaultUnit = async () => {
            const defaultUnitUrl = isStorage ? 
            `http://127.0.0.1:8000/api/diemtapket/${accountInfo.MaDiemTapKet}` :
            `http://127.0.0.1:8000/api/diemgiaodich/${accountInfo.MaDiemGiaoDich}`
            let getField = isStorage ? "DiemTapKet" : "DiemGiaoDich" 
            try {
                const response = await axios.get(
                    defaultUnitUrl
                )
                console.log("get unit data: ", response.data[getField])
                const tmp_name = isStorage ? response.data[getField].TenDiemTapKet : response.data[getField].TenDiaDiemGiaoDich
                setDefaultUnitName(tmp_name)
                setUnitName(tmp_name)
                
            } catch (err) {
                console.log("unit error: ", err)
            }
        }
        getDefaultUnit()
    }, [])
    // setUnitName(defaultUnitName)
    // const defaultUnitList = JSON.parse(localStorage.getItem(`${unit}`))

    // const getUnit = (MaDiem) => {
    //     const ans = isStorage ?
    //         defaultUnitList.filter(unitInfo => (unitInfo.MaDiemTapKet === MaDiem)) :
    //         defaultUnitList.filter(unitInfo => (unitInfo.MaDiemGiaoDich === MaDiem))
    //     if (ans.length > 0)
    //         return ans[0]
    //     else
    //         return null
    // }

    const getFilteredUnitList = (isStorageBool) => {
        // const xxx = isStorageBool ? "StorageStation" : "TransactionStation"
        // let unitList =  

        if (isStorage) {
            if (isStorageBool) {
                return defaultUnitList.filter(unitInfo =>
                (unitInfo.DiaDiem.toLowerCase().includes(unitName.toLowerCase()) ||
                    unitInfo.TenDiemTapKet.toLowerCase().includes(unitName.toLowerCase())))
            }
            else {
                return secondDefaultList.filter(unitInfo =>
                (unitInfo.DiaDiem.toLowerCase().includes(unitName.toLowerCase()) ||
                    unitInfo.TenDiaDiemGiaoDich.toLowerCase().includes(unitName.toLowerCase())))
            }
        }
        else {
            if (isStorageBool) {
                return secondDefaultList.filter(unitInfo =>
                (unitInfo.DiaDiem.toLowerCase().includes(unitName.toLowerCase()) ||
                    unitInfo.TenDiemTapKet.toLowerCase().includes(unitName.toLowerCase())))
            }
            else {
                return defaultUnitList.filter(unitInfo =>
                (unitInfo.DiaDiem.toLowerCase().includes(unitName.toLowerCase()) ||
                    unitInfo.TenDiaDiemGiaoDich.toLowerCase().includes(unitName.toLowerCase())))
            }
        }
        
    }
    // const defaultUnitCode = isStorage ? accountInfo.MaDiemTapKet : accountInfo.MaDiemGiaoDich
    // let defaultUnitName = "không có dữ liệu"
    // if (getUnit(defaultUnitCode)) {
    //     if (isStorage) defaultUnitName = getUnit(defaultUnitCode).TenDiemTapKet
    //     else defaultUnitName = getUnit(defaultUnitCode).TenDiemGiaoDich
    // }
    

    // const filteredUnitList = defaultUnitList.filter(unitInfo =>  
    //     (unitInfo.DiaDiem.toLowerCase().includes(unitName.toLowerCase()) ||
    //     (!isStorageStaff && unitInfo.TenDiemGiaoDich.toLowerCase().includes(unitName.toLowerCase())) ||
    //     (isStorageStaff && unitInfo.TenDiemTapKet.toLowerCase().includes(unitName.toLowerCase())))
    // );

    const accountNameRef = useRef(null)
    const accountPhoneNumberRef = useRef(null)
    const accountEmailRef = useRef(null)
    const isStorageStaffRef = useRef(null)
    const unitNameRef = useRef(null)
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
        if (!phoneNumberRegex.test(accountPhoneNumber) && accountPhoneNumber.trim() !== "") {
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
        if (!emailRegex.test(accountEmail) && accountEmail.trim() !== "") {
            setAccountEmailError(false)
        }
        else {
            setAccountEmailError(true)
        }
        if (event.key === 'Enter') {
            event.preventDefault();
            if (accountEmail.trim() !== "" && accountEmailError)
                isStorageStaffRef.current.focus();
        }
    }

    const changeUnitName = event => {
        event.preventDefault();
        setUnitName(event.target.value)
        setStorageCode(null)
        setTransactionCode(null)
    }
    const handleUnitNameDown = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (unitName.trim() !== "" && storageCode !== null)
                confirmRef.current.focus();
        }
    }

    const handleUnitInfoClick = (event, unitInfo) => {
        event.preventDefault()

        if (isStorageStaff) {
            setUnitName(unitInfo.TenDiemTapKet)
            setStorageCode(unitInfo.MaDiemTapKet)
            setTransactionCode(null)
        }
        else {
            setUnitName(unitInfo.TenDiaDiemGiaoDich)
            setStorageCode(unitInfo.MaDiemTapKet)
            setTransactionCode(unitInfo.MaDiemGiaoDich)
        }
    }
    // console.log(defaultUnitList)

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

        if (isStorageStaff) {
            if (accountName.trim() !== "" &&
                accountPhoneNumber.trim() !== "" &&
                accountEmail.trim() !== "" &&
                unitName.trim() !== "" &&
                storageCode !== null && accountPhoneNumberError && accountEmailError) {
                editAccount(accountInfo.MaTaiKhoan,{
                    username: accountInfo.username,
                    HoVaTen: accountName,
                    SoDienThoai: accountPhoneNumber,
                    email: accountEmail,
                    LoaiTaiKhoan: 5,
                    password: accountInfo.password,
                    MaDiemTapKet: storageCode,
                    MaDiemGiaoDich: null,
                })
            }
            else {
                alert("Dữ liệu nhập vào không hợp lệ hoặc bị thiếu")
            }
        }
        else {
            if (accountName.trim() !== "" &&
                accountPhoneNumber.trim() !== "" &&
                accountEmail.trim() !== "" &&
                unitName.trim() !== "" &&
                storageCode !== null && transactionCode !== null && accountPhoneNumberError && accountEmailError) {
                editAccount(accountInfo.MaTaiKhoan, {
                    username: accountInfo.username,
                    HoVaTen: accountName,
                    SoDienThoai: accountPhoneNumber,
                    email: accountEmail,
                    LoaiTaiKhoan: 3,
                    password: accountInfo.password,
                    MaDiemTapKet: storageCode,
                    MaDiemGiaoDich: transactionCode,
                })
            }
            else {
                alert("Dữ liệu nhập vào không hợp lệ hoặc bị thiếu")
            }
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
        setAccountEmail(accountInfo.email)
        setIsStorageStaff(isStorage)
        setUnitName(defaultUnitName)
        setStorageCode(accountInfo.storageCode)
        setTransactionCode(accountInfo.transactionCode)
    }

    const handleClosePage = (event) => {
        event.preventDefault()
        handleReset(event)
        closePage()
    }
    return (
        <div className={`fixed inset-0 flex justify-center items-center transition-colors ${showEditForm ? "bg-black/20" : "hidden"} z-50`}>
            {/* AddPage Modal */}
            <div className={`bg-white round-lg shadow mt-20 p-6 translate-all max-w-fit rounded-xl gap-4 ${showEditForm ? "scale-100 opacity-100" : "scale-100 opacity-0"} overflow-auto`} onClick={(e) => e.stopPropagation()}>
                <button onClick={handleClosePage} className='absolute top-2 right-2 py-1 px-1 h-10 w-10'>
                    <img src={close_img} />
                </button>
                <h1 className='font-bold text-4xl text-primary flex justify-center my-2'>
                    CẬP NHẬT TÀI KHOẢN NHÂN VIÊN
                </h1>
                <form className='' onSubmit={handleSubmit}>
                    <div className='flex-col mx-2 my-2 text-primary py-0 space-y-1'>
                        <p>Họ và tên tập kết viên</p>
                        <input className="w-full rounded-lg px-1 py-2 border-black text-black shadow-md" type='text' value={accountName} onChange={changeAccountName} ref={accountNameRef} onKeyDown={handleAccountNameDown} />
                        <p>Số điện thoại của tập kết viên</p>
                        <input className="w-full rounded-lg px-1 py-2 border-black text-black shadow-md" type='text' value={accountPhoneNumber} onChange={changeAccountPhoneNumber} ref={accountPhoneNumberRef} onKeyDown={handleAccountPhoneNumberDown} />
                        <p>Email của tập kết viên</p>
                        <input className="w-full rounded-lg px-1 py-2 border-black text-black shadow-md" type='text' value={accountEmail} onChange={changeAccountEmail} ref={accountEmailRef} onKeyDown={handleAccountEmailDown} />
                        <p>Chức vụ đảm nhiệm</p>
                        <div className="flex items-center space-x-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio h-5 w-5 text-blue-600"
                                    checked={isStorageStaff === true}
                                    onChange={(e) => {
                                        e.preventDefault()
                                        setIsStorageStaff(true)
                                        setStorageCode(null)
                                        setTransactionCode(null)
                                    }}
                                />
                                <span className="ml-2">Tập kết Viên</span>
                            </label>

                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio h-5 w-5 text-red-600"
                                    checked={isStorageStaff === false}
                                    onChange={(e) => {
                                        e.preventDefault()
                                        setIsStorageStaff(false),
                                        setStorageCode(null)
                                        setTransactionCode(null)
                                    }}
                                />
                                <span className="ml-2">Giao dịch Viên</span>
                            </label>
                        </div>

                        <p>Địa chỉ/tên của đơn vị</p>
                        <input className="w-full rounded-lg px-1 py-2 border-black text-black shadow-md" type='text' value={unitName} onChange={changeUnitName} ref={unitNameRef} onKeyDown={handleUnitNameDown} />
                        <div
                            className='border-2 rounded-lg'
                            style={{ height: "160px", overflowY: "auto" }}>
                            {getFilteredUnitList(isStorageStaff)?.length > 0 ?
                                <ul>
                                    {getFilteredUnitList(isStorageStaff).map(unitInfo => (
                                        <div
                                            key={isStorageStaff ? unitInfo.MaDiemTapKet : unitInfo.MaDiemGiaoDich}
                                            className='m-1 rounded-md text-primary justify-start p-1 w-full border-b-2 cursor-pointer'
                                            onClick={(e) => handleUnitInfoClick(e, unitInfo)}>
                                            <p className="">{isStorageStaff ? unitInfo.TenDiemTapKet : unitInfo.TenDiaDiemGiaoDich}</p>
                                            <p className='italic text-[10px]'>{unitInfo.DiaDiem}</p>
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

EditStafModal.propTypes = {
    accountProps: PropTypes.object.isRequired,
    editAccountFunc: PropTypes.func.isRequired,
    closePageFunc: PropTypes.func.isRequired,
    // showEditFormProps: PropTypes.object.isRequired
}
export default EditStafModal