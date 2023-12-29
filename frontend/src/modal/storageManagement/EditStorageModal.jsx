import {PropTypes} from 'prop-types'
// import map_img from "../assets/img/tmp_map.png"
import close_img from "../../assets/img/close.png"
import { useRef, useState } from 'react'
// import uuid from 'uuid'
const EditStorageModal = props => {
    const storageInfo = props.storageProps
    const editStorage = props.editStorageFunc
    const closePage = props.closePageFunc
    let showEditForm = props.showEditFormProps

    const [storageName, setStorageName] = useState(storageInfo.TenDiemTapKet)
    const [storageLocation, setStorageLocation] = useState(storageInfo.DiaDiem)
    const [storageHotline, setStorageHotline] = useState(storageInfo.Hotline)
    
    const [storageHotlineError, setStorageHotlineError] = useState(true)

    const storageNameRef = useRef(null)
    const storageLocationRef = useRef(null)
    const storageHotlineRef = useRef(null)
    const confirmRef = useRef(null)

    const changeStorageName = event => {
        event.preventDefault();
        setStorageName(event.target.value)
    }
    const handleStorageNameDown = event => {
        
        if (event.key === 'Enter') {
            event.preventDefault();
            if (storageName.trim() !== "")
            storageLocationRef.current.focus();
        }
    }

    const changeStorageLocation = event => {
        event.preventDefault();
        setStorageLocation(event.target.value)
    }
    const handleStorageLocationDown = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (storageLocation.trim() !== "")
            storageHotlineRef.current.focus();
        }
    }

    const hotlineRegex = /^\d{4,10}$/;
    const changeStorageHotline = event => {
        event.preventDefault();
        setStorageHotline(event.target.value)
    }
    const handleStorageHotlineDown = event => {
        if (storageHotline.trim() !== "" && !hotlineRegex.test(storageHotline)) {
            setStorageHotlineError(false)
        }
        else {
            setStorageHotlineError(true)
        }
        if (event.key === 'Enter') {
            event.preventDefault();
            if (storageHotline.trim() != "" && storageHotlineError)
            confirmRef.current.focus();
        }
    }

    const handleSubmit = event => {

        event.preventDefault()
        if (storageName.trim() !== "" &&
            storageLocation.trim() !== "" &&
            storageHotline.trim() !== "" &&
            storageHotlineError === true) {
                console.log("storageName: ", storageName)
                console.log("storageLocation: ", storageLocation)
                console.log("storageHotline: ", storageHotline)
            editStorage(storageInfo.MaDiemTapKet, {
                TenDiemTapKet: storageName,
                DiaDiem: storageLocation,
                Hotline: storageHotline    
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
        setStorageName(storageInfo.TenDiemTapKet)
        setStorageLocation(storageInfo.DiaDiem)
        setStorageHotline(storageInfo.Hotline)
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
                CẬP NHẬT ĐIỂM TẬP KẾT 
            </h1>
            <form className='' onSubmit={handleSubmit}>
                <div className='flex-col mx-2 my-2 text-primary py-0 space-y-1'>
                    <p>Tên điểm tập kết</p>
                    <input className="w-full rounded-lg px-1 py-2 border-black text-black shadow-md" type='text' value={storageName} onChange={changeStorageName} ref={storageNameRef} onKeyDown={handleStorageNameDown} placeholder='Điền tên điểm tập kết...'/>
                    <p>Địa chỉ điểm tập kết</p>
                    <input className="w-full rounded-lg px-1 py-2 border-black text-black shadow-md" type='text' value={storageLocation} onChange={changeStorageLocation} ref={storageLocationRef} onKeyDown={handleStorageLocationDown} placeholder='Điền dịa chỉ điểm tập kết...'/>
                    <p>Hotline</p>
                    <input className="w-full rounded-lg px-1 py-2 border-black text-black shadow-md" type='text' value={storageHotline} onChange={changeStorageHotline} ref={storageHotlineRef} onKeyDown={handleStorageHotlineDown} placeholder='Điền Hotline của điểm tập kết...'/>
                    {!storageHotlineError && <p className='text-red-600'>Cần nhập số điện thoại chứa từ 4 đến 10 chữ số</p>}
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

EditStorageModal.propTypes = {
    storageProps: PropTypes.object.isRequired,
    editStorageFunc: PropTypes.func.isRequired,
    closePageFunc: PropTypes.func.isRequired,
    // showEditFormProps: PropTypes.object.isRequired
}
export default EditStorageModal