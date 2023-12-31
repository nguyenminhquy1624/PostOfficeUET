// import React from "react"
import add_icon from "../../assets/img/add.png";
import { useEffect, useState } from "react";
import SearchBar from "../../components/searchbar/SearchBar";
import StorageStaffCard from "./StorageStaffCard";
import AddStorageStaffModal from "../../modal/accountManagement/AddStorageStaffModal";
import axios from "axios";

// import DeleteModal from "../../modal/DeleteModal";
const StorageStaffList = () => {
    // const MaDiemTapKet = props.storageCodeProps
    
    const account_info = JSON.parse(localStorage.getItem("account_info"))
    console.log(account_info)
    const MaDiemTapKet = account_info.MaDiemTapKet
    const [getStorage, setGetStorage] = useState(null)

    const [defaultStorageStaffList, setDefaultStorageStaffList] = useState([])
    const [accountCount, setAccountCount] = useState(0)
    const [accountState, setAccountState] = useState([])
    const [showAddForm, setShowAddForm] = useState(false);
    

    useEffect (() => {
        const getData = async () => {
            try {
                const response = await axios.get (
                    `http://127.0.0.1:8000/api/diemtapket/${MaDiemTapKet}/`
                )
                console.log("storageleader data: ", response.data['DiemTapKet'])
                setGetStorage(response.data['DiemTapKet'])
            } catch (error) {
                console.log("storageleader err: ", error)
            }
        }
        const getAccountList = async () => {
            try {
                const response = await axios.get (
                    "http://127.0.0.1:8000/api/account/all/"
                )
                console.log("account data: ", response.data)

                if (response.data['users'].length > 0) {
                    setAccountCount(response.data['users'][response.data['users'].length - 1].MaTaiKhoan)
                }
                // console.log(response.data['users'].filter(
                //     accountInfo => (accountInfo.LoaiTaiKhoan === 5 &&
                //         accountInfo.MaDiemTapKet === MaDiemTapKet))
                // )
                setDefaultStorageStaffList(response.data['users'].filter(
                    accountInfo => (accountInfo.LoaiTaiKhoan === 5 &&
                        accountInfo.MaDiemTapKet === MaDiemTapKet)
                ))
                setAccountState(response.data['users'].filter(
                    accountInfo => (accountInfo.LoaiTaiKhoan === 5 &&
                        accountInfo.MaDiemTapKet === MaDiemTapKet)
                ))
            } catch (error) {
                console.log("account error: ", error)
            }
        }
        getData();
        getAccountList();
    }, [MaDiemTapKet])

    // const MaDiemTapKet = JSON.parse(localStorage.getItem("account"))
    // const getStorage = JSON.parse(localStorage.getItem("StorageStation")).filter(
    //     storageInfo => (storageInfo.MaDiemTapKet === MaDiemTapKet)
    // ) ? JSON.parse(localStorage.getItem("StorageStation")).filter(
    //     storageInfo => (storageInfo.MaDiemTapKet === MaDiemTapKet)
    // )[0]: null
    

    // const defaultStorageStaffList = () => {
    //     return JSON.parse(localStorage.getItem("Account")).filter(
    //         accountInfo => (accountInfo.LoaiTaiKhoan === 5 && 
    //                         accountInfo.MaDiemTapKet === MaDiemTapKet))
    // }

    // const [accountState, setAccountState] = useState(defaultStorageStaffList())
    // const [showAddForm, setShowAddForm] = useState(false);
    // console.log("getStorage: ", getStorage)
    
    const handleAddAccountInfo = async (accountInfo) => {
        console.log("accountInfo: ", accountInfo)
        try {
            let response = await axios.post(
                "http://127.0.0.1:8000/api/account/register/", accountInfo
            )
            console.log("add data: ", response.data)
            alert("Tạo dữ liệu mới thành công !!!")
            window.location.reload();
        } catch (error) {
            console.log("add error: ", error)
            alert("Tạo dữ liệu mới không thành công !!!")
        }
        setShowAddForm(false)
        // const accountList = JSON.parse(localStorage.getItem("Account"))
        // localStorage.setItem("Account", JSON.stringify([...accountList, accountInfo]))
        // setAccountState(defaultStorageStaffList());
        // setShowAddForm(false)
    }

    const handleEditAccountInfo = async (account_id, updatedAccountInfo) => {
        try {
            console.log(`id: ${account_id}`)
            console.log( 'update_data: ', updatedAccountInfo)
            let response = await axios.put(
                `http://127.0.0.1:8000/api/account/update/${account_id}/`,
                updatedAccountInfo
            )
            console.log("edit data: ", response.data)
            alert("Cập nhật dữ liệu thành công !!!")
            window.location.reload();
        } catch (error) {
            console.log("edit error: ", error)
            alert("Cập nhật dữ liệu không thành công !!!")
        }

        // const accountList = JSON.parse(localStorage.getItem("Account"))
        // const newAccountState =accountList.map((accountInfo) => {
        //     if (accountInfo.MaTaiKhoan === updatedAccountInfo.MaTaiKhoan) {
        //         return updatedAccountInfo
        //     }
        //     else {
        //         return accountInfo
        //     }
        // })
        // localStorage.setItem("Account", JSON.stringify(newAccountState))
        // setAccountState(defaultStorageStaffList())
    }
    
    const deleteAccountInfo = async (MaTaiKhoan) => {
        try {
            let response = await axios.delete(
                `http://127.0.0.1:8000/api/account/delete/${MaTaiKhoan}/`
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
        // const accountList = JSON.parse(localStorage.getItem("Account"))
        // const newAccountState = accountList.filter(
        //     account => account.MaTaiKhoan !== MaTaiKhoan
        // )
        // localStorage.setItem("Account", JSON.stringify(newAccountState))
        // setAccountState(defaultStorageStaffList())
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
        // console.log("storageStaffAccount: ", defaultStorageStaffList)
        const filteredAccountState = defaultStorageStaffList.filter(accountInfo => (
            accountInfo.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            accountInfo.HoVaTen.toLowerCase().includes(searchTerm.toLowerCase())
        ))
        // console.log("filteredAccountList: ",filteredAccountState)
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
                            <StorageStaffCard 
                            accountCountProps={accountCount}
                            accountProps={accountInfo} 
                            deleteFunc={deleteAccountInfo} 
                            editFunc={handleEditAccountInfo}
                            key={accountInfo.MaTaiKhoan}/>
                        </div>
                    ))}
                </div>
                </ul>
                <button onClick={handleOpenAddFormClick} className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <img src={add_icon} />
                </button>
            </div>
            <AddStorageStaffModal 
            accountCountProps={accountCount}
            storageInfoProps={getStorage}
            addAccountFunc={handleAddAccountInfo} 
            closePageFunc={handleCloseAddFormClick} 
            addFormProps={showAddForm}/>
        </div>
    );
};

export default StorageStaffList;
