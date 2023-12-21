import edit_icon from "../../assets/img/edit.png";
import info_icon from "../../assets/img/exclamation.png";
import delete_icon from "../../assets/img/delete.png";

import { PropTypes } from "prop-types";
import DeleteModal from "../../modal/storageManagement/DeleteModal";
import { useState } from "react";
// import { FaExpeditedssl } from "react-icons/fa6";
import EditStorageModal from "../../modal/storageManagement/EditStorageModal";

const AccountCard = (props) => {
  const storageInfo = props.storageProps;
  const deleteStorage = props.deleteFunc;
  const editStorage = props.editFunc;
  // const handleDelete = (event, id) => {
  //     event.preventDefault()
  //     deleteStorage(id)
  // }
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = () => {
    deleteStorage(storageInfo.id);
    setShowDeleteModal(false);
  };

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
  };

  const handleConfirmEdit = (editedStorageInfo) => {
    editStorage(editedStorageInfo);
    setShowEditModal(false);
  };

  return (
    <div className="grid grid-cols-2 my-2 border-gray-300 shadow-md border-2 rounded-lg p-2">
      <div className="align-top justify-start">
        <h1 className="font-bold">{storageInfo.TenDiemGiaoDich}</h1>
        <p className="pb-2">
          Trưởng điểm: Nguyễn Văn A<br></br>
          Địa điểm: {storageInfo.DiaDiem}
          <br></br>
          Hotline :{storageInfo.Hotline}
          <br></br>
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
        <div className="flex justify-end align-bottom mr-2">
          Khoảng cách : 1 km
        </div>
      </div>
      <DeleteModal
        showDeleteModalProps={showDeleteModal}
        conFirmDeleteFunc={handleConfirmDelete}
        cancelDeleteFunc={handleCancelDelete}
      />
      <EditStorageModal
        showEditFormProps={showEditModal}
        editStorageFunc={handleConfirmEdit}
        closePageFunc={handleCancelEdit}
        storageProps={storageInfo}
      />
    </div>
  );
};

AccountCard.propTypes = {
  storageProps: PropTypes.object.isRequired,
  deleteFunc: PropTypes.func.isRequired,
  editFunc: PropTypes.func.isRequired,
};

export default AccountCard;
