import { PropTypes } from "prop-types";
import { useState, useEffect } from "react";
import { FiCheckCircle } from "react-icons/fi";
import axios from "axios";
const OrderCardSend = (props) => {
  const orderInfo = props.orderProps;
  const editOrderFunc = props.editOrderFunc;
  const State = props.StateProps;
  const account_info = props.accountInfoProps;
  // const userList = JSON.parse(localStorage.getItem("userData"));
  // const transactionList = JSON.parse(localStorage.getItem("giaodich"));
  // const [transactionInfo, setTransactionInfo] = useState([])
  const [customerInfo, setCustomerInfo] = useState([]);

  // const getCustomer = (MaKhachHang) => {
  //   // const ans = userList.filter(
  //   //   (accountInfo) => accountInfo.MaTaiKhoan == MaKhachHang
  //   // );
  //   // // console.log("ans ", ans[0]);
  //   // if (ans.length > 0) return ans[0];
  //   // else return null;

  // };
  useEffect(() => {
    const getCustomer = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/customer/all/`);
        setCustomerInfo(res.data["customer"]);
        console.log("customer info list: ", res.data["customer"]);
      } catch (error) {
        console.log(error);
      }
    };
    getCustomer();
  }, []);
  // const getTransaction = (MaDiemGiaoDich) => {
  //   // const ans = transactionList.filter(
  //   //   (transactionInfo) => transactionInfo.MaDiemGiaoDich === MaDiemGiaoDich
  //   // );
  //   // console.log("ans ", ans[0]);
  //   // if (ans.length > 0) return ans[0];
  //   // else return null;
  // };
  const getCustomerByID = () => {
    return customerInfo.filter((c) => c.MaKhachHang === orderInfo.MaKhachHang);
  };
  const acceptOrder = (event) => {
    event.preventDefault();
    // orderInfo.MaDiemTapKet = getTransaction(orderInfo.MaDiemGiaoDich).MaDiemTapKet
    // console.log("orderInfoSend: ", orderInfo)
    // editOrderFunc(orderInfo)
    if (State === 1) {
      // Đơn hàng gửi cho khách hàng
      editOrderFunc(orderInfo.MaDonHang, {
        MaTaiKhoan: orderInfo.MaTaiKhoan,
        MaKhachHang: orderInfo.MaKhachHang,
        NgayGuiHang: orderInfo.NgayGuiHang,
        NgayNhanHang: orderInfo.NgayNhanHang,
        TrangThai: 5,
        LoaiHang: orderInfo.LoaiHang,
        KhoiLuong: orderInfo.KhoiLuong,
        Tien: orderInfo.Tien,
        MoTaDonHang: orderInfo.MoTaDonHang,
        HoVaTenNguoiNhan: orderInfo.HoVaTenNguoiNhan,
        DiaChiNhanHang: orderInfo.DiaChiNhanHang,
        SoDienThoaiNguoiNhan: orderInfo.SoDienThoaiNguoiNhan,
        DiaChiNguoiGui: orderInfo.DiaChiNguoiGui,
        MaDiemGiaoDich: orderInfo.MaDiemGiaoDich,
        DiemTapKet: null,
      });
    }
    if (State === 2) {
      // Đơn hàng tới điểm tập kết
      editOrderFunc(orderInfo.MaDonHang, {
        MaTaiKhoan: orderInfo.MaTaiKhoan,
        MaKhachHang: orderInfo.MaKhachHang,
        NgayGuiHang: orderInfo.NgayGuiHang,
        NgayNhanHang: orderInfo.NgayNhanHang,
        TrangThai: 2,
        LoaiHang: orderInfo.LoaiHang,
        KhoiLuong: orderInfo.KhoiLuong,
        Tien: orderInfo.Tien,
        MoTaDonHang: orderInfo.MoTaDonHang,
        HoVaTenNguoiNhan: orderInfo.HoVaTenNguoiNhan,
        DiaChiNhanHang: orderInfo.DiaChiNhanHang,
        SoDienThoaiNguoiNhan: orderInfo.SoDienThoaiNguoiNhan,
        DiaChiNguoiGui: orderInfo.DiaChiNguoiGui,
        MaDiemGiaoDich: orderInfo.MaDiemGiaoDich,
        DiemTapKet: account_info.MaDiemTapKet,
      });
    }
  };

  // console.log("order info: ", orderInfo);
  return (
    <div className="grid grid-cols-2 my-2 border-gray-300 shadow-md border-2 rounded-lg p-2">
      <div className="align-top justify-start">
        <h1 className="font-bold">Đơn hàng số {orderInfo.MaDonHang}</h1>
        <p className="pb-2">
          Khách hàng:{" "}
          {getCustomerByID().length > 0
            ? getCustomerByID()[0].HoVaTen
            : "Không có dữ liệu"}
          <br></br>
          Nơi gửi: {orderInfo.MaDiemGiaoDich}
          <br></br>
          Số điện thoại :{orderInfo.SoDienThoaiNguoiNhan}
          <br></br>
        </p>
      </div>

      <div className="grid grid-flow-row">
        <div className="flex align-top justify-end">
          <button className="w-10 h-10 mx-2" onClick={acceptOrder}>
            <FiCheckCircle />
          </button>
        </div>
      </div>
    </div>
  );
};

OrderCardSend.propTypes = {
  accountInfoProps: PropTypes.object.isRequired,
  orderProps: PropTypes.object.isRequired,
  editOrderFunc: PropTypes.func.isRequired,
  StateProps: PropTypes.object.isRequired,
};

export default OrderCardSend;
