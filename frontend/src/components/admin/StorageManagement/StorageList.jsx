// import React from "react"
import StorageCard from "./StorageCard";
import add_icon from "../../../assets/img/add.png";
import { useState } from "react";
// import {uuidv4} from 'uuid';
import AddStorageModal from "../../../modal/storageManagement/AddStorageModal";
import SearchBar from "../../searchbar/SearchBar";
// import DeleteModal from "../../modal/DeleteModal";
const StorageList = () => {

    const [storageState, setStorageState] = useState(JSON.parse(localStorage.getItem("StorageStation")));
    // const [filteredStorageState, setFilterStorageState] = useState(JSON.parse(localStorage.getItem("StorageStation")))

    const [showAddForm, setShowAddForm] = useState(false);
    
    const handleAddStorageInfo = (storageInfo) => {
        const storageList = JSON.parse(localStorage.getItem("StorageStation"))
        setStorageState([...storageList, storageInfo]);
        localStorage.setItem("StorageStation", JSON.stringify([...storageList, storageInfo]))
        setShowAddForm(false)
    }
    const handleEditStorageInfo = (updatedStorageInfo) => {
        const storageList = JSON.parse(localStorage.getItem("StorageStation"))
        const newStorageState = storageList.map((storageInfo) => {
            if (storageInfo.MaDiemTapKet === updatedStorageInfo.MaDiemTapKet) {
                return updatedStorageInfo
            }
            else {
                return storageInfo
            }
        })
        localStorage.setItem("StorageStation", JSON.stringify(newStorageState))
        setStorageState(newStorageState)
    }
    const deleteStorageInfo = (MaDiemTapKet) => {
        const storageList = JSON.parse(localStorage.getItem("StorageStation"))
        const newStorageState = storageList.filter(
            storage => storage.MaDiemTapKet !== MaDiemTapKet
        )
        localStorage.setItem("StorageStation", JSON.stringify(newStorageState))
        setStorageState(newStorageState)
        
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
        const filteredStorageState = JSON.parse(localStorage.getItem("StorageStation")).filter(storageInfo => (
            storageInfo.TenDiemTapKet.toLowerCase().includes(searchTerm.toLowerCase()) ||
            storageInfo.DiaDiem.toLowerCase().includes(searchTerm.toLowerCase())
        ))
        setStorageState(filteredStorageState)
    }
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