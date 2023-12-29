import StorageList from '../components/admin/StorageManagement/StorageList'
import TransactionList from '../components/admin/TransactionManagement/TransactionList'
import IndexNavbars from '/src/components/navbars/IndexNavbars'
import LeftNavBar from '../components/service/LeftNavBar'
import { useState } from 'react'
import AccountList from '../components/admin/AccountManagement/AccountList'
import AdminNavbars from '../components/navbars/AdminNavbards'

// import { FaMapMarkerAlt } from "react-icons/fa";
// import { RiAccountBoxLine } from "react-icons/ri";
// import { LuLogOut } from "react-icons/lu";
// import { FaChartColumn } from "react-icons/fa6";
// import AdminNavbars from "../components/navbars/AdminNavbards";
// // import ProfileCard from "../components/Profile/ProfileCard";
// import Sidebar, { SidebarItem } from "../components/service/SlideBar";

const AdminPage = () => {
//   const defaultTransactionStationList = [
//     {
//       TenDiemGiaoDich: "Điểm giao dịch Cầu Giấy 1",
//       MaDiemGiaoDich: 12345,
//       DiaDiem: "Số 4 Xuân Thủy",
//       Hotline: "15214",
//       MaDiemTapKet: 1234
//     },
//     {
//       TenDiemGiaoDich: "Điểm giao dịch Cầu Giấy 2",
//       MaDiemGiaoDich: 12346,
//       DiaDiem: "Số 5 Xuân Thủy",
//       Hotline: "15215",
//       MaDiemTapKet: 1234,
//     },
//     {
//       TenDiemGiaoDich: "Điểm giao dịch Cầu Giấy 3",
//       MaDiemGiaoDich: 12347,
//       DiaDiem: "Số 6 Xuân Thủy",
//       Hotline: "15216",
//       MaDiemTapKet: 1234,
//     },

//     {
//       TenDiemGiaoDich: "Điểm giao dịch Bắc Từ Liêm 1",
//       MaDiemGiaoDich: 12355,
//       DiaDiem: "Số 4 Văn Tiến Dũng",
//       Hotline: "15214",
//       MaDiemTapKet: 1235,

//     },
//     {
//       TenDiemGiaoDich: "Điểm giao dịch Bắc Từ Liêm 2",
//       MaDiemGiaoDich: 12356,
//       DiaDiem: "Số 5 Văn Tiến Dũng",
//       Hotline: "15215",
//       MaDiemTapKet: 1235,
//     },
//     {
//       TenDiemGiaoDich: "Điểm giao dịch Bắc Từ Liêm 3",
//       MaDiemGiaoDich: 12357,
//       DiaDiem: "Số 6 Văn Tiến Dũng",
//       Hotline: "15216",
//       MaDiemTapKet: 1235,
//     },
//     {
//       TenDiemGiaoDich: "Điểm giao dịch Đống Đa 1",
//       MaDiemGiaoDich: 12365,
//       DiaDiem: "Số 9 Cát Linh",
//       Hotline: "15214",
//       MaDiemTapKet: 1236,
//     },
//     {
//       TenDiemGiaoDich: "Điểm giao dịch Đống Đa 2",
//       MaDiemGiaoDich: 12366,
//       DiaDiem: "Số 5 Hoàng Cầu",
//       Hotline: "15215",
//       MaDiemTapKet: 1236,

//     },
//     {
//       TenDiemGiaoDich: "Điểm giao dịch Đống Đa 3",
//       MaDiemGiaoDich: 12367,
//       DiaDiem: "Số 6 Hoàng Cầu",
//       Hotline: "15216",
//       MaDiemTapKet: 1236,
//     },
// ]

// const defaultStorageStationList = [
//     {
//       TenDiemTapKet: "Điểm tập kết Cầu Giấy",
//       MaDiemTapKet: 1234,
//       DiaDiem: "Số 3 Trần Quốc Hoàn",
//       Hotline: "15214",
//     },
//     {
//       TenDiemTapKet: "Điểm tập kết Bắc Từ Liêm",
//       MaDiemTapKet: 1235,
//       DiaDiem: "Số 6 Cầu Diễn, xã Minh Khai",
//       Hotline: "15215",
//     },
//     {
//       TenDiemTapKet: "Điểm tập kết Đống Đa",
//       MaDiemTapKet: 1236,
//       DiaDiem: "Số 9 Hoàng Cầu",
//       Hotline: "15216",
//     },
// ]

// const defaultAccountsList = [
//   {
//     MaTaiKhoan: 12321,
//     TenTaiKhoan: "truongTapKet1",
//     HoVaTen: "Nguyễn Văn A",
//     SoDienThoai: "123456",
//     Email: "quan1@gmail.com",
//     LoaiTaiKhoan: 4,
//     MatKhau: "1",
//     MaDiemTapKet: 1234,
//     MaDiemGiaoDich: null,
    
    
//   },
//   {
//     MaTaiKhoan: 12322,
//     TenTaiKhoan: "truongTapKet2",
//     HoVaTen: "Trần Văn B",
//     SoDienThoai: "123457",
//     Email: "quan2@gmail.com",
//     LoaiTaiKhoan: 4,
//     MatKhau: "1",
//     MaDiemTapKet: 1235,
//     MaDiemGiaoDich: null,
    
//   },
//   {
//     MaTaiKhoan: 12323,
//     TenTaiKhoan: "truongTapKet3",
//     HoVaTen: "Lê Thị C",
//     SoDienThoai: "123458",
//     Email: "quan3@gmail.com",
//     LoaiTaiKhoan: 4,
//     MatKhau: "1",
//     MaDiemTapKet: 1236,
//     MaDiemGiaoDich: null,
//   },
// ]

// localStorage.clear();
// if (localStorage.getItem("Account") == null) {
//   localStorage.setItem("Account", JSON.stringify(defaultAccountsList))
// }
// if (localStorage.getItem("TransactionStation") == null) {
//   localStorage.setItem("TransactionStation", JSON.stringify(defaultTransactionStationList))
// }
// if (localStorage.getItem("StorageStation") == null) {
//   localStorage.setItem("StorageStation", JSON.stringify(defaultStorageStationList))
// }

const navItems = [
  { link: "Quản lý Điểm tập kết", path: "StorageManagement", active: true},
  { link: "Quản lý Điểm giao dịch", path: "TransactionManagement", active: false},
  { link: "Quản lý tài khoản", path: "AccountManagement" , active: false},
  { link: "Thống kê hàng gửi/nhập", path: "LogisticStatistic" , active: false},];
if (localStorage.getItem("adminActiveTab") == null) {
  localStorage.setItem("adminActiveTab", JSON.stringify("StorageManagement"))
}
const [activeTab, setActiveTab] = useState(JSON.parse(localStorage.getItem("adminActiveTab")))

const handleTabClick = (value) => {
  setActiveTab(value);
  localStorage.setItem("adminActiveTab", JSON.stringify(value))
}
  return (
    <div>
      <IndexNavbars/>
      <div className="md:flex md:flex-row">
        <LeftNavBar navItemsProps={navItems} changeTabFunc={handleTabClick} activeTabProps={activeTab}/>
        {activeTab === "TransactionManagement" && <TransactionList className="z-10"/>}
        {activeTab === "StorageManagement" && <StorageList className="z-10"/>}
        {activeTab === "AccountManagement" && <AccountList className="z-10" />}
      </div>
      {/* <SearchBar /> */}

    </div>
  )
}

export default AdminPage