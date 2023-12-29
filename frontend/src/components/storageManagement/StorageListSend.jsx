import { useState } from "react";
import SearchBar from "../searchbar/SearchBar";
import StorageCardSend from "./StorageCardSend";
const StorageListSend = () => {
  // const [userList, setUserList] = useState(
  //   JSON.parse(localStorage.getItem("userData"))
  // );
  const [orderList, setOrderList] = useState(JSON.parse(localStorage.getItem("Order")));
  // console.log("StorageListSend: ", orderList)
  const handleEditOrderList = (updatedorderInfo) => {
    const editedOrderList = JSON.parse(localStorage.getItem("Order")).map((orderInfo) => {
      if (orderInfo.MaDonHang === updatedorderInfo.MaDonHang) {
          return updatedorderInfo
      }
      else {
          return orderInfo
      }
  })
  localStorage.setItem("Order",JSON.stringify(editedOrderList))
  console.log(JSON.parse(localStorage.getItem("Order")))
  setOrderList(JSON.parse(localStorage.getItem("Order")))
  }
  return (
    <div className="max-w-full flex-grow">
      <SearchBar />
      <div className="relative justify-items-center mx-10 mt-2 p-4">
        <h1 className="absolute bg-white m-2 px-2 -top-2 left-1/10 italic font-bold text-2xl text-primary">
          QUẢN LÝ ĐƠN HÀNG GỬI
        </h1>
        <div
          id="AccountList"
          className="rounded-lg border-2 border-gray-300 shadow-md px-4 py-5 mb-8"
          style={{ height: "680px", overflowY: "auto" }}
        >
          <ul>
            {orderList.map((orderInfo) => (
              <li key={orderInfo.MaDonHang}>
                <div>
                  {/* <Link to={`./${storageInfo.id}`}></Link>  */}
                  <StorageCardSend orderProps={orderInfo} editOrderFunc={handleEditOrderList} key={orderInfo.MaDonHang} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StorageListSend;