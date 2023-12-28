import { PropTypes } from "prop-types";
import { FiCheckCircle } from "react-icons/fi";

const StorageCard = (props) => {
  let orderInfo = props.orderProps;
  const editOrderFunc = props.editOrderFunc
  const userList = JSON.parse(localStorage.getItem("userData"));

  const getCustomer = (MaKhachHang) => {
    const ans = userList.filter(
      (accountInfo) => accountInfo.MaTaiKhoan == MaKhachHang
    );
    // console.log("ans ", ans[0]);
    if (ans.length > 0) return ans[0];
    else return null;
  };
  
  // console.log("order info: ", orderInfo);

  const sending = (event) => {
    event.preventDefault()
    orderInfo.TrangThai = 2;
    // console.log("orderInfo: ", orderInfo)
    editOrderFunc(orderInfo)

  };

  return (
    <>
      {orderInfo.TrangThai === 1 && orderInfo.MaDiemGiaoDich === 12345 && orderInfo.MaDiemTapKet === null ? (
        <div className="grid grid-cols-2 my-2 border-gray-300 shadow-md border-2 rounded-lg p-2">
          <div className="align-top justify-start">
              <h1 className="font-bold">Đơn hàng số {orderInfo.MaDonHang}</h1>
              <p className="pb-2">
                Khách hàng:{" "}
                {getCustomer(orderInfo.MaKhachHang)
                  ? getCustomer(orderInfo.MaKhachHang).HoVaTen
                  : "Không có dữ liệu"}
                <br></br>
                Nơi gửi: {orderInfo.MaDiemXuatPhat}
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
      ) : (
        ""
      )}
    </>
  );
};

StorageCard.propTypes = {
  orderProps: PropTypes.object.isRequired,
  editOrderFunc: PropTypes.func.isRequired
};

export default StorageCard;
