// import React from "react"
import add_icon from "../../../assets/img/add.png";
import { useState } from "react";
import SearchBar from "../../searchbar/SearchBar";
import StorageStaffCard from "./StorageStaffCard";
import AddStorageStaffModal from "../../../modal/accountManagement/AddStorageStaffModal";

// import DeleteModal from "../../modal/DeleteModal";
const StorageStaffList = () => {
    // const MaDiemTapKet = props.storageCodeProps
    const MaDiemTapKet = 1234
    const getStorage = JSON.parse(localStorage.getItem("StorageStation")).filter(
        storageInfo => (storageInfo.MaDiemTapKet === MaDiemTapKet)
    ) ? JSON.parse(localStorage.getItem("StorageStation")).filter(
        storageInfo => (storageInfo.MaDiemTapKet === MaDiemTapKet)
    )[0]: null
    

    const defaultStorageStaffList = () => {
        return JSON.parse(localStorage.getItem("Account").filter(accountInfo => (accountInfo.LoaiTaiKhoan === 5)))
    }

    const [accountState, setAccountState] = useState(defaultStorageStaffList())
    const [showAddForm, setShowAddForm] = useState(false);
    
    const handleAddAccountInfo = (accountInfo) => {
        const accountList = JSON.parse(localStorage.getItem("Account"))
        localStorage.setItem("Account", JSON.stringify([...accountList, accountInfo]))
        setAccountState(defaultStorageStaffList());
        setShowAddForm(false)
    }

    const handleEditAccountInfo = (updatedAccountInfo) => {
        const accountList = JSON.parse(localStorage.getItem("Account"))
        const newAccountState =accountList.map((accountInfo) => {
            if (accountInfo.MaTaiKhoan === updatedAccountInfo.MaTaiKhoan) {
                return updatedAccountInfo
            }
            else {
                return accountInfo
            }
        })
        localStorage.setItem("Account", JSON.stringify(newAccountState))
        setAccountState(defaultStorageStaffList())
    }
    
    const deleteAccountInfo = (MaTaiKhoan) => {
        const accountList = JSON.parse(localStorage.getItem("Account"))
        const newAccountState = accountList.filter(
            account => account.MaTaiKhoan !== MaTaiKhoan
        )
        localStorage.setItem("Account", JSON.stringify(newAccountState))
        setAccountState(defaultStorageStaffList())
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
        // console.log("searchTerm: ", searchTerm)
        console.log("storageStaffAccount: ", defaultStorageStaffList())
        const filteredAccountState = defaultStorageStaffList().filter(accountInfo => (
            accountInfo.TenTaiKhoan.toLowerCase().includes(searchTerm.toLowerCase()) ||
            accountInfo.HoVaTen.toLowerCase().includes(searchTerm.toLowerCase())
        ))
        console.log("filteredAccountList: ",filteredAccountState)
        setAccountState(filteredAccountState)
    }

    // console.log(isStorage)
    
    return (
        <div className="max-w-full flex-grow">
            <div>
                <SearchBar searchFunc={handleSearchTerm}/>
            </div>        
            <div className="relative justify-items-center mx-10 mt-2 p-4">
                <h1 className="absolute bg-white m-2 px-2 -top-2 left-1/10 italic font-bold text-2xl">
                    QUẢN LÝ TÀI KHOẢN
                </h1>
                <ul>
                <div id='AccountList'
                className="rounded-lg border-2 border-gray-300 shadow-md px-4 py-5 mb-8"
                style={{ height: "600px", overflowY: "auto" }}>
                    {accountState.map(accountInfo => (
                        <div key={accountInfo.MaTaiKhoan}>
                            {/* <Link to={`./${accountInfo.MaTaiKhoan}`}></Link>  */}
                            <StorageStaffCard accountProps={accountInfo} deleteFunc={deleteAccountInfo} editFunc={handleEditAccountInfo} key={accountInfo.MaTaiKhoan}/>
                        </div>
                    ))}
                </div>
                </ul>
                <button onClick={handleOpenAddFormClick} className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <img src={add_icon} />
                </button>
            </div>
            <AddStorageStaffModal 
            storageInfoProps={getStorage}
            addAccountFunc={handleAddAccountInfo} 
            closePageFunc={handleCloseAddFormClick} 
            addFormProps={showAddForm}/>
        </div>
    );
};

export default StorageStaffList;
