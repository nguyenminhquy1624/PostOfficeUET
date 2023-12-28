// import React from "react"
import add_icon from "../../assets/img/add.png";
import { useState, useEffect } from "react";
import SearchBar from "../../components/searchbar/SearchBar";
import AddOrderModal from "../../modal/orderManagement/AddOrderModal";
import OrderManagement from "./OrderManagement";
import axios from 'axios'
// import DeleteModal from "../../modal/DeleteModal";
const OrderManagementList = () => {
    // const MaDiemTapKet = props.storageCodeProps
    const MaKhachHang = 1


    // const defaultOrderInfoList = () => {
    //     return JSON.parse(localStorage.getItem("Order")).filter(
    //         orderInfo => (orderInfo.MaKhachHang === MaKhachHang)
    //     )
    // }
    

    // const getOrderInfoList = async () => {
    //     try {
    //         const response = await axios.get(`http://127.0.0.1:8000/api/donhang/${MaKhachHang}`)
    //         console.log(response.data)
    //     } catch (e) {
    //         console.log('err: ', e)
    //     }
    // }
    const [defaultOrderInfoState, setDefaulttOrderInfoState] = useState([])
    const [orderInfoState, setOrderInfoState] = useState([])
    const [showAddForm, setShowAddForm] = useState(false);
   
    // const handleAddOrInfo = (orderInfo) => {
    //     const orderList = JSON.parse(localStorage.getItem("Order"))
    //     localStorage.setItem("Order", JSON.stringify([...orderList, orderInfo]))
    //     setOrderInfoState(defaultOrderInfoList());
    //     setShowAddForm(false)
    //     console.log(defaultOrderInfoList())
    // }

    useEffect(() => {
        const getData= async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/donhang/all/")
                console.log("get data: ", res.data)
                setDefaulttOrderInfoState(res.data['Don Hang'])
                const order = res.data['Don Hang'].filter(
                    (orderInfo) => orderInfo.MaKhachHang === MaKhachHang
                );
                setOrderInfoState(order)
                
            } catch (error) {
                console.log("error: ", error.message);
            }
        }
        getData();
    }, [])
    const addOrderInfo = async (orderInfo) => {
        try {
            let response = await axios.post(
                "http://127.0.0.1:8000/api/donhang/register/", orderInfo
            )
            console.log("add data: ", response.data)

            // const storageList = JSON.parse(localStorage.getItem("StorageStation"))
            // setStorageState([...storageList, storageInfo]);
            // setDefaultStorageState([...defaultStorageState, storageInfo])
            
            alert("Tạo dữ liệu mới thành công !!!")
            window.location.reload();
            // localStorage.setItem("StorageStation", JSON.stringify([...storageList, storageInfo]))
        } catch (error) {
            console.log("add error: ", error)
            alert("Tạo dữ liệu mới không thành công !!!")
        }
        setShowAddForm(false)
    }
   
    const handleEditOrderInfo = async (order_id, updateOrderInfo) => {
        try {
            console.log(`id: ${order_id}`)
            console.log( 'update_data: ', updateOrderInfo)
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
                    DiemTapKet: updateOrderInfo.DiemTapKet
                }
            )
            console.log("edit data: ", response.data)

            // const newStorageState = defaultStorageState.map((storageInfo) => {
            //     if (storageInfo.MaDiemTapKet === order_id) {
            //         updatedStorageInfo.MaDiemTapKet = order_id
            //         console.log("updatedStorageInfo: ", updatedStorageInfo)
            //         return updatedStorageInfo
            //     }
            //     else {
            //         return storageInfo
            //     }
            // })
            // setDefaultStorageState(newStorageState)
            alert("Cập nhật dữ liệu thành công !!!")
            window.location.reload();
        } catch (error) {
            console.log("edit error: ", error)
            alert("Cập nhật dữ liệu không thành công !!!")
        }
    }
    
    const deleteOrderInfo = async (MaDonHang) => {
        // const orderList = JSON.parse(localStorage.getItem("Order"))
        // const newOrderState = orderList.filter(
        //     orderInfo => (orderInfo.MaDonHang !== MaDonHang && orderInfo.MaKhachHang === MaKhachHang)
        // )
        // localStorage.setItem("Order", JSON.stringify(newOrderState))
        // setOrderInfoState(newOrderState)
        try {
            let response = await axios.delete(
                `http://127.0.0.1:8000/api/donhang/delete/${MaDonHang}`
            )
            console.log("delete data: ",response.data)
            // const newStorageState = defaultStorageState.filter(
            //     storage => storage.MaDiemTapKet !== MaDiemTapKet
            // )
            // setDefaultStorageState(newStorageState)
            alert("Xóa dữ liệu thành công !!!")
            window.location.reload();
        } catch (err) {
            console.log("delete data: ", err)
            alert("Xóa dữ liệu không thành công !!!")
        }
    }

    // const editOrderInfo = (updateOrderInfo) => {
    //     const orderList = JSON.parse(localStorage.getItem("Order"))
    //     const newOrderState = orderList.map((orderInfo) => {
    //         if (orderInfo.MaDiemTapKet === updateOrderInfo.MaDiemTapKet) {
    //             return updateOrderInfo
    //         }
    //         else {
    //             return orderInfo
    //         }
    //     })
    //     localStorage.setItem("Order", JSON.stringify(newOrderState))
    //     setOrderInfoState(newOrderState)
    // }

    const handleOpenAddFormClick = () => {
        setShowAddForm(true)
    }
    const handleCloseAddFormClick = () => {
        setShowAddForm(false)
    }

    
    // const handleSearchTerm = (searchTerm) => {
    //     // console.log("searchTerm: ", searchTerm)
    //     console.log("storageStaffAccount: ", defaultStorageStaffList())
    //     const filteredAccountState = defaultStorageStaffList().filter(accountInfo => (
    //         accountInfo.TenTaiKhoan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         accountInfo.HoVaTen.toLowerCase().includes(searchTerm.toLowerCase())
    //     ))
    //     console.log("filteredAccountList: ",filteredAccountState)
    //     setOrderInfoState(filteredAccountState)
    // }

    // console.log(isStorage)
    
    return (
        <div className="max-w-full flex-grow">
            <div>
                <SearchBar searchFunc='{handleSearchTerm}'/>
            </div>        
            <div className="relative justify-items-center mx-10 mt-2 p-4">
                <h1 className="absolute bg-white m-2 px-2 -top-2 left-1/10 italic font-bold text-2xl">
                    QUẢN LÝ ĐƠN HÀNG
                </h1>
                <ul>
                <div id='AccountList'
                className="rounded-lg border-2 border-gray-300 shadow-md px-4 py-5 mb-8"
                style={{ height: "600px", overflowY: "auto" }}>
                    {orderInfoState.map(orderInfo => (
                        <li key={orderInfo.MaDonHang}>
                            <div>
                            <OrderManagement accountProps={orderInfo} deleteFunc={deleteOrderInfo} editFunc={handleEditOrderInfo}  key={orderInfo.MaDonHang}/>
                        </div>
                        </li>
                        
                    ))}
                </div>
                </ul>
                <button onClick={handleOpenAddFormClick} className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <img src={add_icon} />
                </button>
            </div>
            <AddOrderModal 
            addOrderFunc={addOrderInfo} 
            closePageFunc={handleCloseAddFormClick} 
            addFormProps={showAddForm}
            MaKhachHangProps = {MaKhachHang}/>
        </div>
    );
};

export default OrderManagementList;
