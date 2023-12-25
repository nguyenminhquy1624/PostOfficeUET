// import React from "react"
import add_icon from "../../../assets/img/add.png";
import { useState } from "react";
import SearchBar from "../../searchbar/SearchBar";
import AccountCard from "./AccountCard";
import AddStorageAccountModal from "../../../modal/accountManagement/AddStorageAccountModal";
import AddTransactionAccountModal from "../../../modal/accountManagement/AddTransactionAccountModal";
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";



// import DeleteModal from "../../modal/DeleteModal";
const AccountList = () => {
    
    const getAccountList = (mode) => {
        const mode_type = mode ? 4 : 2
        return JSON.parse(localStorage.getItem("Account")).filter (
            account => account.LoaiTaiKhoan === mode_type
        )
    }

    const [isStorage, setIsStorage] = useState(true)
    const [showDropdown, setShowDropdown] = useState(false)
    const [accountState, setAccountState] = useState(getAccountList(isStorage))
    const [showAddForm, setShowAddForm] = useState(false);
    
    const handleStorageHeaderListClick = (event) => {
        event.preventDefault()
        setAccountState(getAccountList(true))
        setIsStorage(true)
        // console.log("xxx", isStorage, getAccountList(isStorage))

    }
    
    const handleTransactionHeaderClick = (event) => {
        event.preventDefault()
        setAccountState(getAccountList(false))
        setIsStorage(false)
        // console.log("yyy", isStorage, getAccountList(isStorage))

    }

    const handleAddAccountInfo = (accountInfo) => {
        const accountList = JSON.parse(localStorage.getItem("Account"))
        localStorage.setItem("Account", JSON.stringify([...accountList, accountInfo]))
        setAccountState(getAccountList(isStorage));
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
        setAccountState(getAccountList(isStorage))
    }
    
    const deleteAccountInfo = (MaTaiKhoan) => {
        const accountList = JSON.parse(localStorage.getItem("Account"))
        const newAccountState = accountList.filter(
            account => account.MaTaiKhoan !== MaTaiKhoan
        )
        localStorage.setItem("Account", JSON.stringify(newAccountState))
        setAccountState(getAccountList(isStorage))
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

    console.log(isStorage)
    const handleSearchTerm = (searchTerm) => {
        // console.log("searchTerm: ", searchTerm)
        console.log("storageLeaderAccount: ", getAccountList(isStorage))
        const filteredAccountState = getAccountList(isStorage).filter(accountInfo => (
            accountInfo.TenTaiKhoan.toLowerCase().includes(searchTerm.toLowerCase()) ||
            accountInfo.HoVaTen.toLowerCase().includes(searchTerm.toLowerCase())
        ))
        console.log("filteredAccountList: ",filteredAccountState)
        setAccountState(filteredAccountState)
    }

    // console.log(isStorage)
    
    return (
        <div className="max-w-full flex-grow">
            <div className="flex justify-between">
                <div onClick={() => setShowDropdown(!showDropdown)} className="md:ml-10 ml-1 px-2 mt-28 py-[5px] mb-8 relative flex justify-between w-full h-10 md:w-fit md:h-fit rounded-full border-2 border-black">
                    <p className="overflow-hidden">{isStorage ? "Danh sách trưởng điểm tập kết" : "Danh sách trưởng điểm giao dịch"}</p>
                    <button>
                    {showDropdown ? <FaAngleDown /> : <FaAngleUp />}
                    </button>
                    {showDropdown && 
                    <div className="absolute block p-1 h- w-fit top-10 space-y-1 rounded-lg bg-white border-2 border-gray-700 z-30 ">
                        <ul>
                            <li className="overflow-hidden cursor-pointer hover:bg-indigo-400 hover:text-white " onClick={handleStorageHeaderListClick}>Danh sách trưởng điểm tập kết</li>
                            <li className="overflow-hidden cursor-pointer hover:bg-indigo-400 hover:text-white " onClick={handleTransactionHeaderClick}>Danh sách trưởng điểm giao dịch</li>
                        </ul>
                    </div>}
                </div>
                
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
                            <AccountCard accountProps={accountInfo} deleteFunc={deleteAccountInfo} editFunc={handleEditAccountInfo} key={accountInfo.MaTaiKhoan} isStorageProps={isStorage}/>
                        </div>
                    ))}
                </div>
                </ul>
                <button onClick={handleOpenAddFormClick} className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <img src={add_icon} />
                </button>
            </div>
            {isStorage ? <AddStorageAccountModal addAccountFunc={handleAddAccountInfo} closePageFunc={handleCloseAddFormClick} addFormProps={showAddForm}/> : 
            <AddTransactionAccountModal addAccountFunc={handleAddAccountInfo} closePageFunc={handleCloseAddFormClick} addFormProps={showAddForm}/>}        
        </div>
    );
};

export default AccountList;
