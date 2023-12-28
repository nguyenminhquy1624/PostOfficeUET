// import React from "react"
import  TransactionCard from "./TransactionCard";
import add_icon from "../../../assets/img/add.png";
import { useState, useEffect } from "react";
// import {uuidv4} from 'uuid';
import AddTransactionModal from "../../../modal/transactionManagement/AddTransactionModal";
import SearchBar from "../../searchbar/SearchBar";
import axios from "axios";
// import DeleteModal from "../../modal/DeleteModal";
const TransactionList = () => {

    const [defaultTransactionState, setDefaultTransactionState] =  useState([])
    const [transactionState, setTransactionState] = useState([]);
    // const [transactionState, setTransactionState] = useState(JSON.parse(localStorage.getItem("TransactionStation")));
    // const [filteredTransactionState, setFilterTransactionState] = useState(JSON.parse(localStorage.getItem("TransactionStation")))

    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/diemgiaodich/all/")
                console.log("get data: ", res.data)
                setDefaultTransactionState(res.data['Diem Giao Dich'])
                setTransactionState(res.data["Diem Giao Dich"])
            } catch (err) {
                console.log("err: ", err)
            }
        }
        getData();
    }, [])
    
    const handleAddTransactionInfo = async (transactionInfo) => {
        console.log("transactionInfo: ", transactionInfo)
        try {
            let response = await axios.post(
                "http://127.0.0.1:8000/api/diemgiaodich/register/", transactionInfo
            )
            console.log("add data: ", response.data)            
            alert("Tạo dữ liệu mới thành công !!!")
            window.location.reload();
        } catch (error) {
            console.log("add error: ", error)
            alert("Tạo dữ liệu mới không thành công !!!")
        }
        setShowAddForm(false)
        
        // const transactionList = JSON.parse(localStorage.getItem("TransactionStation"))
        // setTransactionState([...transactionList, transactionInfo]);
        // localStorage.setItem("TransactionStation", JSON.stringify([...transactionList, transactionInfo]))
        // setShowAddForm(false)
    }
    const handleEditTransactionInfo = async (transaction_id, updatedTransactionInfo) => {
        try {
            console.log(`id: ${transaction_id}`)
            console.log( 'update_data: ', updatedTransactionInfo)
            let response = await axios.put(
                `http://127.0.0.1:8000/api/diemgiaodich/update/${transaction_id}/`,
                updatedTransactionInfo
            )
            console.log("edit data: ", response.data)
            alert("Cập nhật dữ liệu thành công !!!")
            window.location.reload();
        } catch (error) {
            console.log("edit error: ", error)
            alert("Cập nhật dữ liệu không thành công !!!")
        }
        // const transactionList = JSON.parse(localStorage.getItem("TransactionStation"))
        // const newTransactionState = transactionList.map((transactionInfo) => {
        //     if (transactionInfo.MaDiemGiaoDich === updatedTransactionInfo.MaDiemGiaoDich) {
        //         return updatedTransactionInfo
        //     }
        //     else {
        //         return transactionInfo
        //     }
        // })
        // localStorage.setItem("TransactionStation", JSON.stringify(newTransactionState))
        // setTransactionState(newTransactionState)
    }
    const deleteTransactionInfo = async (MaDiemGiaoDich) => {
        try {
            let response = await axios.delete(
                `http://127.0.0.1:8000/api/diemgiaodich/delete/${MaDiemGiaoDich}`
            )
            console.log("delete data: ",response.data)
            alert("Xóa dữ liệu thành công !!!")
            window.location.reload();
        } catch (err) {
            console.log("delete data: ", err)
            alert("Xóa dữ liệu không thành công !!!")
        }

        // const transactionList = JSON.parse(localStorage.getItem("TransactionStation"))
        // const newTransactionState = transactionList.filter(
        //     transaction => transaction.MaDiemGiaoDich !== MaDiemGiaoDich
        // )
        // localStorage.setItem("TransactionStation", JSON.stringify(newTransactionState))
        // setTransactionState(newTransactionState)
        
    }

    const handleOpenAddFormClick = () => {
        setShowAddForm(true)
    }
    const handleCloseAddFormClick = () => {
        setShowAddForm(false)
    }
    // const handleShowDeleteModalClick = () => {
    //     setShowDeleteModal(true)
    // }
    // const handleCloseDeleteModalClick = () => {
    //     setShowDeleteModal(false)
    // }
    
    const handleSearchTerm = (searchTerm) => {

        const filteredTransactionState = defaultTransactionState.filter(storageInfo => (
            storageInfo.TenDiaDiemGiaoDich.toLowerCase().includes(searchTerm.toLowerCase()) ||
            storageInfo.DiaDiem.toLowerCase().includes(searchTerm.toLowerCase())
        ))
        setTransactionState(filteredTransactionState)

        // const filteredTransactionState = JSON.parse(localStorage.getItem("TransactionStation")).filter(transactionInfo => (
        //     transactionInfo.TenDiemGiaoDich.toLowerCase().includes(searchTerm.toLowerCase()) ||
        //     transactionInfo.DiaDiem.toLowerCase().includes(searchTerm.toLowerCase())
        // ))
        // setTransactionState(filteredTransactionState)
    }
    return (
        <div className="max-w-full flex-grow">
            <SearchBar searchFunc={handleSearchTerm} />
            <div className="relative justify-items-center mx-10 mt-2 p-4">
                <h1 className="absolute bg-white m-2 px-2 -top-2 left-1/10 italic font-bold text-2xl">
                    ĐIỂM GIAO DỊCH
                </h1>
                <div id='transactionList' 
                className="rounded-lg border-2 border-gray-300 shadow-md px-4 py-5 mb-8"
                style={{ height: "600px", overflowY: "auto" }}>
                    <ul>
                        {transactionState.map(transactionInfo => (
                            <div key={transactionInfo.MaDiemGiaoDich}>
                                {/* <Link to={`./${transactionInfo.MaDiemGiaoDich}`}></Link>  */}
                                <TransactionCard transactionProps={transactionInfo} deleteFunc={deleteTransactionInfo} editFunc={handleEditTransactionInfo} key={transactionInfo.MaDiemGiaoDich}/>
                            </div>
                        ))}
                    </ul>
                </div>
                <button onClick={handleOpenAddFormClick} className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <img src={add_icon} />
                </button>
            </div>
            <AddTransactionModal addTransactionFunc={handleAddTransactionInfo} closePageFunc={handleCloseAddFormClick} addFormProps={showAddForm}/>        
        </div>
    );
};

export default TransactionList;