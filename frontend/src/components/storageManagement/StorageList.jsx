// import React from "react"
import StorageCard from "./StorageCard";
import add_icon from "../../assets/img/add.png";
import { useState } from "react";
// import {uuidv4} from 'uuid';
import AddStorageModal from "../../modal/storageManagement/AddStorageModal";
import SearchBar from "../searchbar/SearchBar";
// import DeleteModal from "../../modal/DeleteModal";
const StorageList = () => {
  const [storageState, setStorageState] = useState([
    {
      id: 1,
      TenDiemGiaoDich: "Điểm giao dịch Cầu Giấy 1",
      MaDiemGiaoDich: 12345,
      MaTruongDiem: 1234,
      DiaDiem: "Số 4 Xuân Thủy",
      Hotline: 15214,
    },
    {
      id: 2,
      TenDiemGiaoDich: "Điểm giao dịch Cầu Giấy 2",
      MaDiemGiaoDich: 12346,
      MaTruongDiem: 1235,
      DiaDiem: "Số 5 Xuân Thủy",
      Hotline: 15215,
    },
    {
      id: 3,
      TenDiemGiaoDich: "Điểm giao dịch Cầu Giấy 3",
      MaDiemGiaoDich: 12347,
      MaTruongDiem: 1236,
      DiaDiem: "Số 6 Xuân Thủy",
      Hotline: 15216,
    },
  ]);
  // console.log(storageState)
  const [showAddForm, setShowAddForm] = useState(false);

  // const [showDeleteModal,setShowDeleteModal] = useState(false);
  // const [deleteConfirm, setDeleteConfirm] = useState(false)
  const handleAddStorageInfo = (storageInfo) => {
    setStorageState([...storageState, storageInfo]);
    setShowAddForm(false);
  };
  const handleEditStorageInfo = (updatedStorageInfo) => {
    const newStorageState = storageState.map((storageInfo) => {
      if (storageInfo.id === updatedStorageInfo.id) {
        return updatedStorageInfo;
      } else {
        return storageInfo;
      }
    });
    setStorageState(newStorageState);
  };
  const deleteStorageInfo = (id) => {
    const newStorageState = storageState.filter((storage) => storage.id !== id);
    setStorageState(newStorageState);
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
      <div className="relative justify-items-center mx-10 mt-2 p-2">
        <h1 className="absolute bg-white m-2 px-2 -top-2 left-1/10 italic font-bold text-2xl text-primary">
          ĐIỂM GIAO DỊCH
        </h1>
        <div
          id="storageList"
          className="rounded-lg border-2 border-gray-300 shadow-md px-4 py-5 mb-8"
          style={{ height: "680px", overflowY: "auto" }}
        >
          <ul>
            {storageState.map((storageInfo) => (
              <li key={storageInfo.id}>
                <div >
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
      <AddStorageModal
        addStorageFunc={handleAddStorageInfo}
        closePageFunc={handleCloseAddFormClick}
        addFormProps={showAddForm}
      />
    </div>
  );
};

export default StorageList;
