// import React from "react"
import StorageCard from "./AccountCard";
import add_icon from "../../assets/img/add.png";
import { useState } from "react";
// import {uuidv4} from 'uuid';
import AddAccountModal from "../../modal/accountManagement/AddAccountModal";
import SearchBar from "../searchbar/SearchBar";
// import DeleteModal from "../../modal/DeleteModal";
const AccountList = () => {
  const [accountState, setAccountState] = useState([
    {
      id: 1,
      MaTaiKhoan: "12321",
      MaDiemGiaoDich: "12345",
    },
    {
      id: 2,
      MaTaiKhoan: "12322",
      MaDiemGiaoDich: "12346",
    },
    {
      id: 3,
      MaTaiKhoan: "12323",
      MaDiemGiaoDich: "12347",
    },
  ]);
  // console.log(accountState)
  const [showAddForm, setShowAddForm] = useState(false);

  // const [showDeleteModal,setShowDeleteModal] = useState(false);
  // const [deleteConfirm, setDeleteConfirm] = useState(false)
  const handleAddStorageInfo = (storageInfo) => {
    setAccountState([...accountState, storageInfo]);
    setShowAddForm(false);
  };
  const handleEditStorageInfo = (updatedAccountInfo) => {
    const newAccountState = accountState.map((accountInfo) => {
      if (accountInfo.id === updatedAccountInfo.id) {
        return updatedAccountInfo;
      } else {
        return accountInfo;
      }
    });
    setAccountState(newAccountState);
  };
  const deleteStorageInfo = (id) => {
    const newStorageState = accountState.filter((storage) => storage.id !== id);
    setAccountState(newStorageState);
  };

  const handleOpenAddFormClick = () => {
    setShowAddForm(true);
  };
  const handleCloseAddFormClick = () => {
    setShowAddForm(false);
  };
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
        <h1 className="absolute bg-white m-2 px-2 -top-2 left-1/10 italic font-bold text-2xl text-primary">
          QUẢN LÝ TÀI KHOẢN
        </h1>
        <div
          id="AccountList"
          className="rounded-lg border-2 border-gray-300 shadow-md px-4 py-5 mb-8"
          style={{ height: "680px", overflowY: "auto" }}
        >
          <ul>
            {accountState.map((storageInfo) => (
              <li key={storageInfo.id}>
                <div>
                  {/* <Link to={`./${storageInfo.id}`}></Link>  */}
                  <StorageCard
                    storageProps={storageInfo}
                    deleteFunc={deleteStorageInfo}
                    editFunc={handleEditStorageInfo}
                    key={storageInfo.id}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={handleOpenAddFormClick}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <img src={add_icon} />
        </button>
      </div>
      <AddAccountModal
        addStorageFunc={handleAddStorageInfo}
        closePageFunc={handleCloseAddFormClick}
        addFormProps={showAddForm}
      />
    </div>
  );
};

export default AccountList;
