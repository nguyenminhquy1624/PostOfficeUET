import edit_icon from "../../../assets/img/edit.png";
import info_icon from "../../../assets/img/exclamation.png";
import delete_icon from "../../../assets/img/delete.png";

import {PropTypes} from 'prop-types'
import DeleteModal from "../../../modal/transactionManagement/DeleteModal";
import { useEffect, useState } from "react";
import axios from "axios";
// import { FaExpeditedssl } from "react-icons/fa6";
import EditTransactionModal from "../../../modal/transactionManagement/EditTransactionModal";
const TransactionCard = (props) => {

    // const accountList = JSON.parse(localStorage.getItem("Account"))
    // console.log(accountList)
    const [accountList, setAccountList] = useState([])
    useEffect(() => {
        const getAccount = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/account/all/")
                console.log("response.data: ", response.data)
                setAccountList(response.data['users'])
            }
            catch (error) {
                console.log(error);
            }
        }
        getAccount(); 
    }, [])
    const transactionInfo = props.transactionProps;
    const deleteTransaction = props.deleteFunc;
    const editTransaction = props.editFunc
    // const handleDelete = (event, id) => {
    //     event.preventDefault()
    //     deleteTransaction(id)
    // }
    const [showDeleteModal,setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false)

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    }
    
    const handleCancelDelete = () => {
        setShowDeleteModal(false);
    }

    const handleConfirmDelete = () => {
        deleteTransaction(transactionInfo.MaDiemGiaoDich);
        setShowDeleteModal(false)
    }

    const handleEditClick = () => {
        setShowEditModal(true)
    }

    const handleCancelEdit = () => {
        setShowEditModal(false)
    }

    const handleConfirmEdit = (transaction_id ,editedTransactionInfo) => {
        editTransaction(transaction_id, editedTransactionInfo)
        setShowEditModal(false)
    }

    const getTransactionLeader = (MaDiemGiaoDich) => {
        const ans = accountList.filter(
            accountInfo => (accountInfo.MaDiemGiaoDich == MaDiemGiaoDich &&
                accountInfo.LoaiTaiKhoan === 2))
        // console.log(ans[0])
        if (ans.length > 0)
            return ans[0]
        else
            return null

    }
    
    return (
        <div className="grid grid-cols-2 my-2 border-gray-300 shadow-md border-2 rounded-lg p-2">
            <div className="align-top justify-start">
                <h1 className="font-bold"> 
                    {transactionInfo.TenDiaDiemGiaoDich}
                </h1>
                <p className="pb-2">
                    Trưởng điểm: {getTransactionLeader(transactionInfo.MaDiemGiaoDich) ? getTransactionLeader(transactionInfo.MaDiemGiaoDich).HoVaTen : "Không có dữ liệu"}<br></br>
                    Địa điểm: {transactionInfo.DiaDiem}<br></br>
                    Hotline :{transactionInfo.Hotline}<br></br>
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
            <EditTransactionModal 
            showEditFormProps={showEditModal} 
            editTransactionFunc={handleConfirmEdit} 
            closePageFunc={handleCancelEdit} 
            transactionProps={transactionInfo}  />
        </div>
    );
};

TransactionCard.propTypes = {
    transactionProps: PropTypes.object.isRequired,
    deleteFunc: PropTypes.func.isRequired,
    editFunc: PropTypes.func.isRequired
}

export default TransactionCard;