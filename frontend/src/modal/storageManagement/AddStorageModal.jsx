import {PropTypes} from 'prop-types'
// import map_img from "../assets/img/tmp_map.png"
import close_img from "../../assets/img/close.png"
import { useRef, useState } from 'react'
// import uuid from 'uuid'
const AddStorageModal = props => {
    const addStorage = props.addStorageFunc
    const closePage = props.closePageFunc
    let showAddForm = props.addFormProps
    const [storageName, setStorageName] = useState('')
    const [storageCode, setStorageCode] = useState("")
    const [storageLocation, setStorageLocation] = useState("")
    const [storageManager, setStorageManager] = useState("")
    const [storageHotline, setStorageHotline] = useState("")

    const storageNameRef = useRef(null)
    const storageCodeRef = useRef(null)
    const storageManagerRef = useRef(null)
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
            storageManagerRef.current.focus();
        }
    }

    const changeStorageManager = event => {
        event.preventDefault();
        setStorageManager(event.target.value)
    }
    const handleStorageManagerDown = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
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
            storageHotlineRef.current.focus();
        }
    }

    const changeStorageHotline = event => {
        event.preventDefault();
        setStorageHotline(event.target.value)
    }
    const handleStorageHotlineDown = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            confirmRef.current.focus();
        }
    }

    const handleSubmit = event => {
        event.preventDefault()
        addStorage({
            id: 5,
            TenDiemGiaoDich: storageName,
            MaDiemGiaoDich: storageCode,
            MaTruongDiem: storageManager,
            DiaDiem: storageLocation,
            Hotline: storageHotline,    
        })
    }

    // const handleConfirmDown = event => {
    //     if (event.key === 'Enter') {
    //         event.preventDefault();
    //         handleSubmit(event)
    //     }
    // }
    const handleReset = () => {
        event.preventDefault()
        setStorageName('')
        setStorageCode("")
        setStorageLocation("")
        setStorageManager("")
        setStorageHotline("")
    }

    const handleClosePage = event => {
        // event.preventDefault()
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
                TẠO ĐIỂM GIAO DỊCH
            </h1>
            <form className='' onSubmit={handleSubmit}>
                <div className='flex-col mx-2 my-2 text-primary py-0 space-y-1'>
                    <p>Tên điểm  giao dịch</p>
                    <input className="w-full rounded-lg px-1 py-2 border-black text-black shadow-md" type='text' value={storageName} onChange={changeStorageName} ref={storageNameRef} onKeyDown={handleStorageNameDown} placeholder='Điền tên điểm giao dịch...'/>
                    <p>Mã điểm giao dịch</p>
                    <input className="w-full rounded-lg px-1 py-2 border-black text-black shadow-md" type='text' value={storageCode} onChange={changeStorageCode} ref={storageCodeRef} onKeyDown={handleStorageCodeDown} placeholder='Điền mã điểm giao dịch...'/>
                    <p>Mã trưởng điểm giao dịch</p>
                    <input className="w-full rounded-lg px-1 py-2 border-black text-black shadow-md" type='text' value={storageManager} onChange={changeStorageManager} ref={storageManagerRef} onKeyDown={handleStorageManagerDown} placeholder='Điền mã của trưởng giao dịch...'/>
                    <p>Địa chỉ điểm giao dịch</p>
                    <input className="w-full rounded-lg px-1 py-2 border-black text-black shadow-md" type='text' value={storageLocation} onChange={changeStorageLocation} ref={storageLocationRef} onKeyDown={handleStorageLocationDown} placeholder='Điền dịa chỉ điểm giao dịch...'/>
                    <p>Hotline</p>
                    <input className="w-full rounded-lg px-1 py-2 border-black text-black shadow-md" type='text' value={storageHotline} onChange={changeStorageHotline} ref={storageHotlineRef} onKeyDown={handleStorageHotlineDown} placeholder='Điền Hotline của điểm giao dịch...'/>
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

AddStorageModal.propTypes = {
    addStorageFunc: PropTypes.func.isRequired,
    closePageFunc: PropTypes.func.isRequired,
    addFormProps: PropTypes.object.isRequired
}
export default AddStorageModal