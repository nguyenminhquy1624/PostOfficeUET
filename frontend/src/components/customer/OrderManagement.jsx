import info_icon from "../../assets/img/exclamation.png";
import delete_icon from "../../assets/img/delete.png";
import edit_icon from "../../assets/img/edit.png";
import { PropTypes } from "prop-types";
import { useState } from "react";
import EditOrderModal from "../../modal/orderManagement/EditOrderModal";
import DeleteOrderModal from "../../modal/orderManagement/DeleteOrderModal";
const OrderManagement = (props) => {
  const orderInfo = props.accountProps;
  const deleteOrder = props.deleteFunc;
  const editOrder = props.editFunc;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = () => {
    deleteOrder(orderInfo.MaDonHang);
    setShowDeleteModal(false);
  };
  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
  };

  const handleConfirmEdit = (order_id,editOrderInfo) => {
    editOrder(order_id, editOrderInfo);
    setShowEditModal(false);
  };
  // const getCustomer = (MaKhachHang) => {
  //   return JSON.parse(localStorage.getItem("userData")).filter(
  //     (customerInfo) => customerInfo.MaKhachHang === MaKhachHang
  //   );
  // };
  return (
    <div className="grid grid-cols-2 my-2 border-gray-300 shadow-md border-2 rounded-lg p-2">
      <div className="align-top justify-start">
        <h1 className="font-bold"> {orderInfo.LoaiHang}</h1>
        <p className="pb-2">
          Mã đơn hàng: {orderInfo.MaDonHang}
          <br></br>
          Số điện thoại: {orderInfo.SoDienThoaiNguoiNhan}
          <br></br>
          Họ và tên người nhận: {orderInfo.HoVaTenNguoiNhan}
          <br></br>
          Địa chỉ người nhận: {orderInfo.DiaChiNhanHang}
          <br></br>
          Mã điểm giao dịch: {orderInfo.MaDiemGiaoDich}
          <br></br>
          Ngày gửi hàng: {orderInfo.NgayGuiHang}
        </p>
      </div>
      <div className="grid grid-flow-row">
        <div className="flex align-top justify-end mx-2">
          <img src={info_icon} className=" w-5 h-5 mx-2" />
          <button className="w-5 h-5 mx-2" onClick={handleEditClick}>
            <img src={edit_icon} className=" w-5 h-5" />
          </button>
          <button className="w-5 h-5" onClick={handleDeleteClick}>
            <img src={delete_icon} className=" w-5 h-5" />
          </button>
        </div>
      </div>
      <EditOrderModal
        showEditFormProps={showEditModal}
        editOrderProps={handleConfirmEdit}
        closePageFunc={handleCancelEdit}
        orderProps={orderInfo}
      />
      <DeleteOrderModal
        showDeleteModalProps={showDeleteModal}
        conFirmDeleteFunc={handleConfirmDelete}
        cancelDeleteFunc={handleCancelDelete}
      />
    </div>
  );
};

OrderManagement.propTypes = {
  accountProps: PropTypes.object.isRequired,
  deleteFunc: PropTypes.func.isRequired,
  editFunc: PropTypes.func.isRequired,
};

export default OrderManagement;
