import { useState, useEffect } from "react";
import OrderCard from "./OrderCard";
import axios from "axios";
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";

const OrderList = () => {
  const account_info = JSON.parse(localStorage.getItem("account_info"));
  console.log(account_info);
  const [defaultOrderList, setDefaultOrderList] = useState([]);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/donhang/all/");
        console.log("get data: ", res.data);
        const order = res.data["Don Hang"]
        setDefaultOrderList(order);
      } catch (error) {
        console.log("get don hang err: ", error);
      }
    };
    getOrder();
  }, []);
  console.log('donhang: ', defaultOrderList)
  const getOrderList = (State) => {
    if (State === 1) { // đơn hàng đến từ điểm tập kết để chuyển cho khách hàng nhận
      return defaultOrderList.filter( 
        (orderInfo) =>
          orderInfo.TrangThai === 4 &&
          orderInfo.MaDiemGiaoDich === account_info.MaDiemGiaoDich &&
          orderInfo.DiemTapKet === account_info.MaDiemTapKet
      );
    } else if (State === 2) { // đơn hàng được tạo từ khách hàng chuyển đến điểm tập kết
      return defaultOrderList.filter(
        (orderInfo) =>
          orderInfo.TrangThai === 1 &&
          orderInfo.MaDiemGiaoDich === account_info.MaDiemGiaoDich &&
          orderInfo.DiemTapKet === null
      );
    } else if (State === 3) { // đơn hàng hoàn lại từ điểm tập kết 
      return defaultOrderList.filter(
      (orderInfo) =>
        orderInfo.TrangThai === 6 &&
        orderInfo.MaDiemGiaoDich === account_info.MaDiemGiaoDich &&
        orderInfo.DiemTapKet === account_info.MaDiemTapKet
      );
    } else { // đơn hàng hoàn lại từ khách hàng nhận để gửi cho điểm tập kết rồi trả về người gửi
      return defaultOrderList.filter( 
        (orderInfo) =>
          orderInfo.TrangThai === 6 &&
          orderInfo.MaDiemGiaoDich === account_info.MaDiemGiaoDich &&
          orderInfo.DiemTapKet === null
        );
    }
  };
  // 1. Đơn gửi từ điểm tập kết => điểm giao dịch đích
  // 2. Đơn gửi mới từ khách hàng => điểm tập kết gốc
  // 3. Đơn hoàn lại từ điểm tập kết => hoàn lại cho khách hàng
  // 4. Đơn hoàn lại từ khách hàng nhận => điểm giao dịch đích
  const [State, setState] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleOrderFromStorage = (event) => {
    event.preventDefault();
    setState(1);
    // console.log("xxx", isStorage, getAccountList(isStorage))
  };

  const handleOrderFromCustomer = (event) => {
    event.preventDefault();
    setState(2);
    // console.log("yyy", isStorage, getAccountList(isStorage))
  };

  const handleRefundOrderToCustomer = (event) => {
    event.preventDefault();
    setState(3);
    // console.log("yyy", isStorage, getAccountList(isStorage))
  };

  const handleRefundOrderFromCustomer = (event) => {
    event.preventDefault();
    setState(4);
    // console.log("yyy", isStorage, getAccountList(isStorage))
  };
  const handleEditOrderList = async (order_id, updateOrderInfo) => {
    // const editedOrderList = JSON.parse(localStorage.getItem("Order")).map((orderInfo) => {
    //   if (orderInfo.MaDonHang === updatedorderInfo.MaDonHang) {
    //       return updatedorderInfo
    //   }
    //   else {
    //       return orderInfo
    //   }
    // })
    // localStorage.setItem("Order", JSON.stringify(editedOrderList))
    // console.log(JSON.parse(localStorage.getItem("Order")))
    // setOrderList(JSON.parse(localStorage.getItem("Order")))
    try {
      console.log(`id: ${order_id}`);
      console.log("update_data: ", updateOrderInfo);
      let response = await axios.put(
        `http://127.0.0.1:8000/api/donhang/update/${order_id}/`,
        {
          MaTaiKhoan: updateOrderInfo.MaTaiKhoan,
          MaKhachHang: updateOrderInfo.MaKhachHang,
          NgayGuiHang: updateOrderInfo.NgayGuiHang,
          NgayNhanHang: updateOrderInfo.NgayNhanHang,
          TrangThai: updateOrderInfo.TrangThai,
          LoaiHang: updateOrderInfo.LoaiHang,
          KhoiLuong: updateOrderInfo.KhoiLuong,
          Tien: updateOrderInfo.Tien,
          MoTaDonHang: updateOrderInfo.MoTaDonHang,
          HoVaTenNguoiNhan: updateOrderInfo.HoVaTenNguoiNhan,
          DiaChiNhanHang: updateOrderInfo.DiaChiNhanHang,
          SoDienThoaiNguoiNhan: updateOrderInfo.SoDienThoaiNguoiNhan,
          DiaChiNguoiGui: updateOrderInfo.DiaChiNguoiGui,
          MaDiemGiaoDich: updateOrderInfo.MaDiemGiaoDich,
          DiemTapKet: updateOrderInfo.DiemTapKet,
        }
      );
      console.log("edit data: ", response.data);
      alert("Cập nhật dữ liệu thành công !!!");
      window.location.reload();
    } catch (error) {
      console.log("edit error: ", error);
      alert("Cập nhật dữ liệu không thành công !!!");
    }
  };

  // const handleSearchTerm = (searchTerm) => {
  //   // console.log("searchTerm: ", searchTerm)
  //   // console.log("storageLeaderAccount: ", getAccountList(isStorage))
  //   // const filteredAccountState = getOrderList(State).filter(orderInfo => (
  //   //   orderInfo.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   //   orderInfo.HoVaTen.toLowerCase().includes(searchTerm.toLowerCase())
  //   // ))
  //   // console.log("filteredAccountList: ",filteredAccountState)
  // };
  return (
    <div className="max-w-full flex-grow">
      <div className="flex justify-between">
        <div
          onClick={() => setShowDropdown(!showDropdown)}
          className="md:ml-10 ml-1 px-2 mt-28 py-[5px] mb-8 relative flex justify-between w-full h-10 md:w-fit md:h-fit rounded-full border-2 border-black"
        >
          <p className="overflow-hidden">
            {State === 1
              ? "Đơn hàng từ điểm tập kết"
              : State === 2
              ? "Đơn hàng từ khách hàng"
              : State === 3
              ? "Đơn hàng hoàn từ điểm tập kết"
              : "Đơn hàng hoàn từ khách hàng"}
          </p>
          <button>{showDropdown ? <FaAngleDown /> : <FaAngleUp />}</button>
          {showDropdown && (
            <div className="absolute block p-1 h- w-fit top-10 space-y-1 rounded-lg bg-white border-2 border-gray-700 z-30 ">
              <ul>
                <li
                  className="overflow-hidden cursor-pointer hover:bg-indigo-400 hover:text-white "
                  onClick={handleOrderFromStorage}
                >
                  Đơn hàng từ điểm tập kết
                </li>
                <li
                  className="overflow-hidden cursor-pointer hover:bg-indigo-400 hover:text-white "
                  onClick={handleOrderFromCustomer}
                >
                  Đơn hàng từ khách hàng
                </li>
                <li
                  className="overflow-hidden cursor-pointer hover:bg-indigo-400 hover:text-white "
                  onClick={handleRefundOrderToCustomer}
                >
                  Đơn hàng hoàn từ điểm tập kết
                </li>
                <li
                  className="overflow-hidden cursor-pointer hover:bg-indigo-400 hover:text-white "
                  onClick={handleRefundOrderFromCustomer}
                >
                  Đơn hàng hoàn (khách hàng không nhận)
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* <SearchBar searchFunc={handleSearchTerm} /> */}
      </div>
      <div className="relative justify-items-center mx-10 mt-2 p-4">
        <h1 className="absolute bg-white m-2 px-2 -top-2 left-1/10 italic font-bold text-2xl text-primary">
          QUẢN LÝ ĐƠN HÀNG NHẬN
        </h1>
        <div
          id="OrderList"
          className="rounded-lg border-2 border-gray-300 shadow-md px-4 py-5 mb-8"
          style={{ height: "680px", overflowY: "auto" }}
        >
          <ul>
            {getOrderList(State).map((orderInfo) => (
              <li key={orderInfo.MaDonHang}>
                <div>
                  <OrderCard
                    StateProps={State}
                    orderProps={orderInfo}
                    editOrderFunc={handleEditOrderList}
                    AccountInfoProps={account_info}
                    key={orderInfo.MaDonHang}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
