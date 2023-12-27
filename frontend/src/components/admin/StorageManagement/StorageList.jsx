// import React from "react"
import StorageCard from "./StorageCard";
import add_icon from "../../../assets/img/add.png";
import { useState, useEffect } from "react";
// import {uuidv4} from 'uuid';
import AddStorageModal from "../../../modal/storageManagement/AddStorageModal";
import SearchBar from "../../searchbar/SearchBar";
import axios from 'axios'
// import DeleteModal from "../../modal/DeleteModal";
const StorageList = () => {

    const access_token = localStorage.getItem("access");
    console.log("access_token: ", access_token)
    const [defaultStorageState, setDefaultStorageState] = useState([])
    // const [storageState, setStorageState] = useState(JSON.parse(localStorage.getItem("StorageStation")));
    const [storageState, setStorageState] = useState(JSON.parse(localStorage.getItem("StorageStation")));
    // const [filteredStorageState, setFilterStorageState] = useState(JSON.parse(localStorage.getItem("StorageStation")))

    const [showAddForm, setShowAddForm] = useState(false);
    
    useEffect(() => {
        const getData= async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/diemtapket/all/")
                console.log("get data: ", res.data)
                setDefaultStorageState(res.data['Diem Tap Ket'])

                setStorageState(res.data['Diem Tap Ket'])
            } catch (error) {
                console.log("error: ", error.message);
            }
        }
        getData();
    }, [])

    const handleAddStorageInfo = async (storageInfo) => {
        try {
            let response = await axios.post(
                "http://127.0.0.1:8000/api/diemtapket/register/", storageInfo
            )
            console.log("add data: ", response.data)

            // const storageList = JSON.parse(localStorage.getItem("StorageStation"))
            // setStorageState([...storageList, storageInfo]);
            // setDefaultStorageState([...defaultStorageState, storageInfo])
            
            alert("Tạo dữ liệu mới thành công !!!")
            window.location.reload();
            // localStorage.setItem("StorageStation", JSON.stringify([...storageList, storageInfo]))
        } catch (error) {
            console.log("add error: ", error)
            alert("Tạo dữ liệu mới không thành công !!!")
        }
        setShowAddForm(false)
    }
    const handleEditStorageInfo = async (storage_id, updatedStorageInfo) => {
        try {
            console.log(`id: ${storage_id}`)
            console.log( 'update_data: ', updatedStorageInfo)
            let response = await axios.put(
                `http://127.0.0.1:8000/api/diemtapket/update/${storage_id}/`,
                {
                    TenDiemTapKet: updatedStorageInfo.TenDiemTapKet,
                    DiaDiem: updatedStorageInfo.DiaDiem,
                    Hotline: updatedStorageInfo.Hotline
                }
            )
            console.log("edit data: ", response.data)

            // const newStorageState = defaultStorageState.map((storageInfo) => {
            //     if (storageInfo.MaDiemTapKet === storage_id) {
            //         updatedStorageInfo.MaDiemTapKet = storage_id
            //         console.log("updatedStorageInfo: ", updatedStorageInfo)
            //         return updatedStorageInfo
            //     }
            //     else {
            //         return storageInfo
            //     }
            // })
            // setDefaultStorageState(newStorageState)
            alert("Cập nhật dữ liệu thành công !!!")
            window.location.reload();
        } catch (error) {
            console.log("edit error: ", error)
            alert("Cập nhật dữ liệu không thành công !!!")
        }
        // const storageList = JSON.parse(localStorage.getItem("StorageStation"))
        // const newStorageState = storageList.map((storageInfo) => {
        //     if (storageInfo.MaDiemTapKet === updatedStorageInfo.MaDiemTapKet) {
        //         return updatedStorageInfo
        //     }
        //     else {
        //         return storageInfo
        //     }
        // })
        // localStorage.setItem("StorageStation", JSON.stringify(newStorageState))
        // setStorageState(newStorageState)
    }
    const deleteStorageInfo = async (MaDiemTapKet) => {
        try {
            let response = await axios.delete(
                `http://127.0.0.1:8000/api/diemtapket/delete/${MaDiemTapKet}`
            )
            console.log("delete data: ",response.data)
            // const newStorageState = defaultStorageState.filter(
            //     storage => storage.MaDiemTapKet !== MaDiemTapKet
            // )
            // setDefaultStorageState(newStorageState)
            alert("Xóa dữ liệu thành công !!!")
            window.location.reload();
        } catch (err) {
            console.log("delete data: ", err)
            alert("Xóa dữ liệu không thành công !!!")
        }
        // const storageList = JSON.parse(localStorage.getItem("StorageStation"))
        // const newStorageState = storageList.filter(
        //     storage => storage.MaDiemTapKet !== MaDiemTapKet
        // )
        // localStorage.setItem("StorageStation", JSON.stringify(newStorageState))
        // setStorageState(newStorageState)
        
    }

    const handleOpenAddFormClick = () => {
        setShowAddForm(true)
    }
    const handleCloseAddFormClick = () => {
        setShowAddForm(false)
    }
    // const handleShowDeleteModalClick = () => {
    //     setShowDeleteModal(true)
    // }
    // const handleCloseDeleteModalClick = () => {
    //     setShowDeleteModal(false)
    // }
    
    const handleSearchTerm = (searchTerm) => {
        // const filteredStorageState = JSON.parse(localStorage.getItem("StorageStation")).filter(storageInfo => (
        //     storageInfo.TenDiemTapKet.toLowerCase().includes(searchTerm.toLowerCase()) ||
        //     storageInfo.DiaDiem.toLowerCase().includes(searchTerm.toLowerCase())
        // ))
        // setStorageState(filteredStorageState)

        const filteredStorageState = defaultStorageState.filter(storageInfo => (
            storageInfo.TenDiemTapKet.toLowerCase().includes(searchTerm.toLowerCase()) ||
            storageInfo.DiaDiem.toLowerCase().includes(searchTerm.toLowerCase())
        ))
        setStorageState(filteredStorageState)
    }

    console.log("storageState: ", storageState)
    return (
        <div className="max-w-full flex-grow">
            <SearchBar searchFunc={handleSearchTerm} />
            <div className="relative justify-items-center mx-10 mt-2 p-4">
                <h1 className="absolute bg-white m-2 px-2 -top-2 left-1/10 italic font-bold text-2xl">
                    ĐIỂM TẬP KẾT
                </h1>
                <div id='storageList' 
                className="rounded-lg border-2 border-gray-300 shadow-md px-4 py-5 mb-8"
                style={{ height: "600px", overflowY: "auto" }}>
                    <ul>
                        {storageState.map(storageInfo => (
                            <div key={storageInfo.MaDiemTapKet}>
                                {/* <Link to={`./${storageInfo.MaDiemTapKet}`}></Link>  */}
                                <StorageCard storageProps={storageInfo} deleteFunc={deleteStorageInfo} editFunc={handleEditStorageInfo} key={storageInfo.MaDiemTapKet}/>
                            </div>
                        ))}
                    </ul>
                </div>
                <button onClick={handleOpenAddFormClick} className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <img src={add_icon} />
                </button>
            </div>
            <AddStorageModal addStorageFunc={handleAddStorageInfo} closePageFunc={handleCloseAddFormClick} addFormProps={showAddForm}/>        
        </div>
    );
};

export default StorageList;