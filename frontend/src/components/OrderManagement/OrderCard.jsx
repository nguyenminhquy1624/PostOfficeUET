import { PropTypes } from "prop-types";
import { FiCheckCircle } from "react-icons/fi";
import { useState, useEffect } from "react";
import axios from "axios";
const OrderCard = (props) => {
  const orderInfo = props.orderProps;
  const editOrderFunc = props.editOrderFunc;
  const State = props.StateProps;
  const account_info = props.AccountInfoProps;
  // const userList = JSON.parse(localStorage.getItem("userData"));
  // const [customerInfo, setCustomerInfo] = useState([]);
  const [customerInfo, setCustomerInfo] = useState([]);
  const [customer, setCustomer] = useState([]);
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

  const getCustomerByID = () => {
    return customerInfo.filter((c) => c.MaKhachHang === orderInfo.MaKhachHang);
  };

  // console.log('customer info: ', getCustomerByID()[0].HoVaTen)

  const sending = (event) => {
    event.preventDefault();
    // console.log("orderInfo: ", orderInfo)

    if (State === 1 && State === 3) {
      // gửi từ điểm tập kết đích tới điểm giao dịch đích
      // hoặc hoàn từ điểm tập kết đến điểm giao dịch
      editOrderFunc(orderInfo.MaDonHang, {
        MaTaiKhoan: orderInfo.MaTaiKhoan,
        MaKhachHang: orderInfo.MaKhachHang,
        NgayGuiHang: orderInfo.NgayGuiHang,
        NgayNhanHang: orderInfo.NgayNhanHang,
        TrangThai: 5, // 
        LoaiHang: orderInfo.LoaiHang,
        KhoiLuong: orderInfo.KhoiLuong,
        Tien: orderInfo.Tien,
        MoTaDonHang: orderInfo.MoTaDonHang,
        HoVaTenNguoiNhan: orderInfo.HoVaTenNguoiNhan,
        DiaChiNhanHang: orderInfo.DiaChiNhanHang,
        SoDienThoaiNguoiNhan: orderInfo.SoDienThoaiNguoiNhan,
        DiaChiNguoiGui: orderInfo.DiaChiNguoiGui,
        MaDiemGiaoDich: orderInfo.MaDiemGiaoDich, //
        DiemTapKet: account_info.DiemTapKet, //
      });
    }
    if (State === 2 && State === 4) {
      // gửi từ khách hàng tới điểm giao dịch gốc
      // hoặc được hoàn từ khách hàng nhận tới điểm giao dịch 
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
        DiemTapKet: null,
      });
    }
  };

  return (
    <>
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
            <button className="w-10 h-10 mx-2" onClick={sending}>
              <FiCheckCircle />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

OrderCard.propTypes = {
  orderProps: PropTypes.object.isRequired,
  editOrderFunc: PropTypes.func.isRequired,
  StateProps: PropTypes.object.isRequired,
  AccountInfoProps: PropTypes.object.isRequired
};

export default OrderCard;
