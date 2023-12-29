// import React from "react"
import add_icon from "../../assets/img/add.png";
import { useEffect, useState } from "react";
import SearchBar from "../searchbar/SearchBar";
import TransactionStaffCard from "./TransactionStaffCard";
import AddTransactionStaffModal from "../../modal/accountManagement/AddTransactionStaffModal";
import axios from "axios";

// import DeleteModal from "../../modal/DeleteModal";
const TransactionStaffList = () => {
    // const MaDiemGiaoDich = props.transactionCodeProps
    
    const account_info = JSON.parse(localStorage.getItem("account_info"))
    console.log(account_info)
    const MaDiemGiaoDich = account_info.MaDiemGiaoDich
    const [getTransaction, setGetTransaction] = useState(null)

    const [defaultTransactionStaffList, setDefaultTransactionStaffList] = useState([])
    const [accountCount, setAccountCount] = useState(0)
    const [accountState, setAccountState] = useState([])
    const [showAddForm, setShowAddForm] = useState(false);
    

    useEffect (() => {
        const getData = async () => {
            try {
                const response = await axios.get (
                    `http://127.0.0.1:8000/api/diemgiaodich/${MaDiemGiaoDich}/`
                )
                console.log("transactionleader data: ", response.data['DiemGiaoDich'])
                setGetTransaction(response.data['DiemGiaoDich'])
            } catch (error) {
                console.log("transactionleader err: ", error)
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
                //         accountInfo.MaDiemGiaoDich === MaDiemGiaoDich))
                // )
                setDefaultTransactionStaffList(response.data['users'].filter(
                    accountInfo => (accountInfo.LoaiTaiKhoan === 3 &&
                        accountInfo.MaDiemGiaoDich === MaDiemGiaoDich)
                ))
                setAccountState(response.data['users'].filter(
                    accountInfo => (accountInfo.LoaiTaiKhoan === 3 &&
                        accountInfo.MaDiemGiaoDich === MaDiemGiaoDich)
                ))
            } catch (error) {
                console.log("account error: ", error)
            }
        }
        getData();
        getAccountList();
    }, [MaDiemGiaoDich])

    // const MaDiemGiaoDich = JSON.parse(localTransaction.getItem("account"))
    // const getTransaction = JSON.parse(localTransaction.getItem("TransactionStation")).filter(
    //     transactionInfo => (transactionInfo.MaDiemGiaoDich === MaDiemGiaoDich)
    // ) ? JSON.parse(localTransaction.getItem("TransactionStation")).filter(
    //     transactionInfo => (transactionInfo.MaDiemGiaoDich === MaDiemGiaoDich)
    // )[0]: null
    

    // const defaultTransactionStaffList = () => {
    //     return JSON.parse(localTransaction.getItem("Account")).filter(
    //         accountInfo => (accountInfo.LoaiTaiKhoan === 5 && 
    //                         accountInfo.MaDiemGiaoDich === MaDiemGiaoDich))
    // }

    // const [accountState, setAccountState] = useState(defaultTransactionStaffList())
    // const [showAddForm, setShowAddForm] = useState(false);
    // console.log("getTransaction: ", getTransaction)
    
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
        // const accountList = JSON.parse(localTransaction.getItem("Account"))
        // localTransaction.setItem("Account", JSON.stringify([...accountList, accountInfo]))
        // setAccountState(defaultTransactionStaffList());
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

        // const accountList = JSON.parse(localTransaction.getItem("Account"))
        // const newAccountState =accountList.map((accountInfo) => {
        //     if (accountInfo.MaTaiKhoan === updatedAccountInfo.MaTaiKhoan) {
        //         return updatedAccountInfo
        //     }
        //     else {
        //         return accountInfo
        //     }
        // })
        // localTransaction.setItem("Account", JSON.stringify(newAccountState))
        // setAccountState(defaultTransactionStaffList())
    }
    
    const deleteAccountInfo = async (MaTaiKhoan) => {
        try {
            let response = await axios.delete(
                `http://127.0.0.1:8000/api/account/delete/${MaTaiKhoan}/`
            )
            console.log("delete data: ",response.data)
            // const newTransactionState = defaultTransactionState.filter(
            //     transaction => transaction.MaDiemGiaoDich !== MaDiemGiaoDich
            // )
            // setDefaultTransactionState(newTransactionState)
            alert("Xóa dữ liệu thành công !!!")
            window.location.reload();
        } catch (err) {
            console.log("delete data: ", err)
            alert("Xóa dữ liệu không thành công !!!")
        }
        // const accountList = JSON.parse(localTransaction.getItem("Account"))
        // const newAccountState = accountList.filter(
        //     account => account.MaTaiKhoan !== MaTaiKhoan
        // )
        // localTransaction.setItem("Account", JSON.stringify(newAccountState))
        // setAccountState(defaultTransactionStaffList())
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
        // console.log("transactionStaffAccount: ", defaultTransactionStaffList)
        const filteredAccountState = defaultTransactionStaffList.filter(accountInfo => (
            accountInfo.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            accountInfo.HoVaTen.toLowerCase().includes(searchTerm.toLowerCase())
        ))
        // console.log("filteredAccountList: ",filteredAccountState)
        setAccountState(filteredAccountState)
    }

    // console.log(isTransaction)
    
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
                            <TransactionStaffCard 
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
            <AddTransactionStaffModal 
            accountCountProps={accountCount}
            transactionInfoProps={getTransaction}
            addAccountFunc={handleAddAccountInfo} 
            closePageFunc={handleCloseAddFormClick} 
            addFormProps={showAddForm}/>
        </div>
    );
};

export default TransactionStaffList;
