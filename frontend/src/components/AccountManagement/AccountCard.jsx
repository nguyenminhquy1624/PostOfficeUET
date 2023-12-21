import edit_icon from "../../assets/img/edit.png";
import info_icon from "../../assets/img/exclamation.png";
import delete_icon from "../../assets/img/delete.png";

import { PropTypes } from "prop-types";
import DeleteModal from "../../modal/storageManagement/DeleteModal";
import { useState } from "react";
// import { FaExpeditedssl } from "react-icons/fa6";
import EditAccountModal from "../../modal/accountManagement/EditAccountModal";

const AccountCard = (props) => {
    const accountInfo = props.accountProps;
    const deleteAccount = props.deleteFunc;
    const editAccount = props.editFunc
    // const handleDelete = (event, id) => {
    //     event.preventDefault()
    //     deleteAccount(id)
    // }
    const [showDeleteModal,setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false)

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

    const handleConfirmDelete = () => {
        deleteAccount(accountInfo.MaTaiKhoan);
        setShowDeleteModal(false)
    }

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
  };

    const handleConfirmEdit = (editedAccountInfo) => {
        editAccount(editedAccountInfo)
        setShowEditModal(false)
    }

    
    return (
        <div className="grid grid-cols-2 my-2 border-gray-300 shadow-md border-2 rounded-lg p-2">
            <div className="align-top justify-start">
                <h1 className="font-bold"> 
                    {accountInfo.HoVaTen}
                </h1>
                <p className="pb-2">
                    Email: {accountInfo.Emali}<br></br>
                   Số điện thoại: {accountInfo.SoDienThoai}<br></br>
                </p>
            </div>
            <div className="grid grid-flow-row">
                <div className="flex align-top justify-end mx-2">
                    <img src={info_icon} className=" w-5 h-5 mx-2" />
                    <button className="w-5 h-5 mx-2" onClick={handleEditClick}>
                        <img src={edit_icon} className=" w-5 h-5"/>
                    </button>
                    <button className="w-5 h-5" onClick={handleDeleteClick}>
                        <img src={delete_icon} className=" w-5 h-5" />
                    </button>
                </div>
            </div>
            <DeleteModal 
            showDeleteModalProps={showDeleteModal} 
            conFirmDeleteFunc={handleConfirmDelete} 
            cancelDeleteFunc={handleCancelDelete} />
            <EditAccountModal
            showEditFormProps={showEditModal} 
            editAccountFunc={handleConfirmEdit} 
            closePageFunc={handleCancelEdit} 
            accountProps={accountInfo}  />
        </div>
    );
};

AccountCard.propTypes = {
    accountProps: PropTypes.object.isRequired,
    deleteFunc: PropTypes.func.isRequired,
    editFunc: PropTypes.func.isRequired
}

export default AccountCard;
