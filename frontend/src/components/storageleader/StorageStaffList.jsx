// import React from "react"
import add_icon from "../../assets/img/add.png";
import { useState, useEffect } from "react";
import SearchBar from "../../components/searchbar/SearchBar";
import StorageStaffCard from "./StorageStaffCard";
import AddStorageStaffModal from "../../modal/accountManagement/AddStorageStaffModal";
import axios from "axios";
// import DeleteModal from "../../modal/DeleteModal";
const StorageStaffList = () => {
  // const MaDiemTapKet = props.storageCodeProps
  const MaDiemTapKet = 1234;
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

  const [accountState, setAccountState] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [storageStateList, setStorageStateList] = useState(null);

  useEffect(() => {
    const getAccount = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/account/all/");
        setAccountState(res.data["users"]);
        console.log(res.data["users"]);
      } catch (error) {
        console.log("get err account: ", error);
      }
    };
    getAccount();
    const getStorageStaffList = async () => {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/api/diemtapket/all/"
        );
        setStorageStateList(res.data["Diem Tap Ket"]);
        console.log(res.data["Diem Tap Ket"]);
      } catch (error) {
        console.log("err storage state list: ", error);
      }
    };
    getStorageStaffList();
  }, []);

  const handleAddAccountInfo = async (accountInfo) => {
    // const accountList = JSON.parse(localStorage.getItem("Account"))
    // localStorage.setItem("Account", JSON.stringify([...accountList, accountInfo]))
    // setAccountState(defaultStorageStaffList());
    // setShowAddForm(false)
    try {
      let res = await axios.post(
        "http://127.0.0.1:8000/api/account/register/",
        accountInfo
      );
      console.log("add account: ", res.data);

      alert("tạo tài khoản thành công");
      window.location.reload();
    } catch (error) {
      console.log("err add account: ", error);
      alert("tạo tài khoản không thành công");
    }
    setShowAddForm(false);
  };

  const handleEditAccountInfo = async (account_id, updatedAccountInfo) => {
    // const accountList = JSON.parse(localStorage.getItem("Account"));
    // const newAccountState = accountList.map((accountInfo) => {
    //   if (accountInfo.MaTaiKhoan === updatedAccountInfo.MaTaiKhoan) {
    //     return updatedAccountInfo;
    //   } else {
    //     return accountInfo;
    //   }
    // });
    // localStorage.setItem("Account", JSON.stringify(newAccountState));
    // setAccountState(storageStateList);
    try {
      console.log(`id: ${account_id}`);
      console.log("update account: ", updatedAccountInfo);
      let res = await axios.put(
        `http://127.0.0.1:8000/api/account/update/${account_id}/`,
        {
          username: updatedAccountInfo.username,
          password: updatedAccountInfo.password,
          HoVaTen: updatedAccountInfo.HoVaTen,
          SoDienThoai: updatedAccountInfo.SoDienThoai,
          email: updatedAccountInfo.Email,
          LoaiTaiKhoan: updatedAccountInfo.LoaiTaiKhoan,
          MaDiemTapKet: updatedAccountInfo.MaDiemTapKet,
          MaDiemGiaoDich: updatedAccountInfo.MaDiemGiaoDich,
        }
      );
      console.log("edit account: ", res.data);
      alert("update account thanh cong");
      window.location.reload();
    } catch (error) {
      console.log("err update account: ", error);
      alert("update không thành công");
    }
  };

  const deleteAccountInfo = async (MaTaiKhoan) => {
    //     const accountList = JSON.parse(localStorage.getItem("Account"));
    //     const newAccountState = accountList.filter(
    //       (account) => account.MaTaiKhoan !== MaTaiKhoan
    //     );
    //     // localStorage.setItem("Account", JSON.stringify(newAccountState))
    //     setAccountState(newAccountState);

    try {
      let res = await axios.delete(
        `http://127.0.0.1:8000/api/account/delete/${MaTaiKhoan}/`
      );
      console.log("del acc: ", res.data);
      alert("xoa tai khoan thanh cong!");
    } catch (error) {
      console.log("del acc err: ", error);
      alert("xoa khong thanh cong!!");
    }
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

  const handleSearchTerm = (searchTerm) => {
    // console.log("searchTerm: ", searchTerm)
    console.log("storageStaffAccount: ", accountState);
    const filteredAccountState = accountState.filter(
      (accountInfo) =>
        accountInfo.TenTaiKhoan.toLowerCase().includes(
          searchTerm.toLowerCase()
        ) ||
        accountInfo.HoVaTen.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log("filteredAccountList: ", filteredAccountState);
    setAccountState(filteredAccountState);
  };

  // console.log(isStorage)

  return (
    <div className="max-w-full flex-grow">
      <div>
        <SearchBar searchFunc={handleSearchTerm} />
      </div>
      <div className="relative justify-items-center mx-10 mt-2 p-4">
        <h1 className="absolute bg-white m-2 px-2 -top-2 left-1/10 italic font-bold text-2xl">
          QUẢN LÝ TÀI KHOẢN
        </h1>
        <ul>
          <div
            id="AccountList"
            className="rounded-lg border-2 border-gray-300 shadow-md px-4 py-5 mb-8"
            style={{ height: "600px", overflowY: "auto" }}
          >
            {accountState !== null ? (
              accountState.map((accountInfo) => (
                <div key={accountInfo.MaTaiKhoan}>
                  {/* <Link to={`./${accountInfo.MaTaiKhoan}`}></Link>  */}
                  <StorageStaffCard
                    accountProps={accountInfo}
                    deleteFunc={deleteAccountInfo}
                    editFunc={handleEditAccountInfo}
                    key={accountInfo.MaTaiKhoan}
                  />
                </div>
              ))
            ) : (
              <div></div>
            )}
          </div>
        </ul>
        <button
          onClick={handleOpenAddFormClick}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <img src={add_icon} />
        </button>
      </div>
      <AddStorageStaffModal
        storageInfoProps={storageStateList}
        addAccountFunc={handleAddAccountInfo}
        closePageFunc={handleCloseAddFormClick}
        addFormProps={showAddForm}
      />
    </div>
  );
};

export default StorageStaffList;
