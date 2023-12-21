// import React from "react"
import add_icon from "../../assets/img/add.png";
import { useState } from "react";
import SearchBar from "../searchbar/SearchBar";
import AccountCard from "./AccountCard";
import AddAccountModal from "../../modal/accountManagement/AddAccountModal";
// import DeleteModal from "../../modal/DeleteModal";
const AccountList = () => {
    const [accountState, setAccountState] = useState([
        {
            TenTaiKhoan: "truongGiaoDich1",
            HoVaTen: "Nguyễn Văn A",
            MaTaiKhoan: "12321",
            MaDiemGiaoDich: "12345",
            MatKhau: "1",
            SoDienThoai: "123456",
            Email: "quan1@gmail.com",
            LoaiTaiKhoan: 2,
            
        },
        {
            TenTaiKhoan: "truongGiaoDich2",
            HoVaTen: "Trần Văn B",
            MaTaiKhoan: "12322",
            MaDiemGiaoDich: "12346",
            MatKhau: "1",
            SoDienThoai: "123457",
            Email: "quan2@gmail.com",
            LoaiTaiKhoan: 2,
            
        },
        {
            TenTaiKhoan: "truongGiaoDich3",
            HoVaTen: "Lê Thị C",
            MaTaiKhoan: "12323",
            MaDiemGiaoDich: "12347",
            MatKhau: "1",
            SoDienThoai: "123458",
            Email: "quan3@gmail.com",
            LoaiTaiKhoan: 2,
        },
    ])
    
    // console.log(StorageManagerState)
    const [showAddForm, setShowAddForm] = useState(false);

    // const [showDeleteModal,setShowDeleteModal] = useState(false);
    // const [deleteConfirm, setDeleteConfirm] = useState(false)
    const handleAddAccountInfo = (accountInfo) => {
        setAccountState([...accountState, accountInfo]);
        setShowAddForm(false)
    }
    const handleEditAccountInfo = (updatedAccountInfo) => {
        const newAccountState =accountState.map((accountInfo) => {
            if (accountInfo.MaTaiKhoan === updatedAccountInfo.MaTaiKhoan) {
                return updatedAccountInfo
            }
            else {
                return accountInfo
            }
        })
        setAccountState(newAccountState)
    }

    const deleteAccountInfo = (MaTaiKhoan) => {
        const newAccountState = accountState.filter(
            account => account.MaTaiKhoan !== MaTaiKhoan
        )
        setAccountState(newAccountState)
        
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
    
    return (
        <div className="max-w-full flex-grow">
            <SearchBar />
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
                            <AccountCard accountProps={accountInfo} deleteFunc={deleteAccountInfo} editFunc={handleEditAccountInfo} key={accountInfo.MaTaiKhoan}/>
                        </div>
                    ))}
                </div>
                </ul>
                <button onClick={handleOpenAddFormClick} className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <img src={add_icon} />
                </button>
            </div>
            <AddAccountModal addAccountFunc={handleAddAccountInfo} closePageFunc={handleCloseAddFormClick} addFormProps={showAddForm}/>        
        </div>
    );
};

export default AccountList;
