import OrderList from "../components/OrderManagement/OderList";
import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { RiAccountBoxLine } from "react-icons/ri";
import AdminNavbars from "../components/navbars/AdminNavbards";
import LeftNavBar from "../components/service/LeftNavBar";
import OrderListSend from "../components/OrderManagement/OderListSend";


const TransactionStaff = () => {
  const navItems = [
    {
      link: "Quản lý đơn hàng nhận",
      path: "OrderReceive",
      active: true,
      page: <OrderList />,
      icon: <FaMapMarkerAlt />,
    },
    {
      link: "Quản lý đơn hàng gửi",
      path: "OrderSend",
      active: false,
      page: <OrderList />,
      icon: <RiAccountBoxLine />,
    },
  ];

  const defaultCustomer = [
    {
        MaTaiKhoan: 1,
        TenTaiKhoan: "user1",
        SoDienThoai: "12",
        HoVaTen: "Nguyen Van A",
        MatKhau: "1",
        Email: "a@gmail.com",
      },
      {
        MaTaiKhoan: 2,
        TenTaiKhoan: "user2",
        SoDienThoai: "123",
        HoVaTen: "Nguyen Van B",
        MatKhau: "1",
        Email: "b@gmail.com",
      },
      {
        MaTaiKhoan: 3,
        TenTaiKhoan: "user3",
        SoDienThoai: "12",
        HoVaTen: "Nguyen Van C",
        MatKhau: "1",
        Email: "c@gmail.com",
      },
  ]

  const defaultOrder = [
    {
        MaDonHang: 1,
        MaKhachHang:1,
        MaNhanVienGiaoHang: '',
        NgayGuiHang:'1.1.2024',
        NgayNhan: '3.1.2024',
        TrangThai: 2,
        LoaiHang: '',
        KhoiLuong: '',
        TienCuoc: '',
        TienThuHo: '',
        MoTaDonHang: '',
        HoTenNguoiNhan: '',
        DiaChiNhanHang: '',
        SoDienThoaiNguoiNhan: '1',
        MaDiemGiaoDich: 12345,
        MaDiemTapKet: null
    },
    {
        MaDonHang:2,
        MaKhachHang:2,
        MaNhanVienGiaoHang: '',
        NgayGuiHang:'5.1.2024',
        NgayNhan: '3.1.2024',
        TrangThai: 1,
        LoaiHang: '',
        KhoiLuong: '',
        TienCuoc: '',
        TienThuHo: '',
        MoTaDonHang: '',
        HoTenNguoiNhan: '',
        DiaChiNhanHang: '',
        SoDienThoaiNguoiNhan: '1',
        MaDiemGiaoDich: 12345,
        MaDiemTapKet: null
    },
    {
        MaDonHang:3,
        MaKhachHang:3,
        MaNhanVienGiaoHang: '',
        NgayGuiHang:'1.1.2024',
        NgayNhan: '3.1.2024',
        TrangThai: 1,
        LoaiHang: '',
        KhoiLuong: '',
        TienCuoc: '',
        TienThuHo: '',
        MoTaDonHang: '',
        HoTenNguoiNhan: '',
        DiaChiNhanHang: '',
        SoDienThoaiNguoiNhan: '1',
        MaDiemGiaoDich: 12345,
        MaDiemTapKet: null
    }
  ]

  const defaultTransactionStationList = [
    {
      TenDiemGiaoDich: "Điểm giao dịch Cầu Giấy 1",
      MaDiemGiaoDich: 12345,
      DiaDiem: "Số 4 Xuân Thủy",
      Hotline: "15214",
      MaDiemTapKet: 1234
    },
    {
      TenDiemGiaoDich: "Điểm giao dịch Cầu Giấy 2",
      MaDiemGiaoDich: 12346,
      DiaDiem: "Số 5 Xuân Thủy",
      Hotline: "15215",
      MaDiemTapKet: 1234,
    },
    {
      TenDiemGiaoDich: "Điểm giao dịch Cầu Giấy 3",
      MaDiemGiaoDich: 12347,
      DiaDiem: "Số 6 Xuân Thủy",
      Hotline: "15216",
      MaDiemTapKet: 1234,
    },

    {
      TenDiemGiaoDich: "Điểm giao dịch Bắc Từ Liêm 1",
      MaDiemGiaoDich: 12355,
      DiaDiem: "Số 4 Văn Tiến Dũng",
      Hotline: "15214",
      MaDiemTapKet: 1235,

    },
    {
      TenDiemGiaoDich: "Điểm giao dịch Bắc Từ Liêm 2",
      MaDiemGiaoDich: 12356,
      DiaDiem: "Số 5 Văn Tiến Dũng",
      Hotline: "15215",
      MaDiemTapKet: 1235,
    },
    {
      TenDiemGiaoDich: "Điểm giao dịch Bắc Từ Liêm 3",
      MaDiemGiaoDich: 12357,
      DiaDiem: "Số 6 Văn Tiến Dũng",
      Hotline: "15216",
      MaDiemTapKet: 1235,
    },
    {
      TenDiemGiaoDich: "Điểm giao dịch Đống Đa 1",
      MaDiemGiaoDich: 12365,
      DiaDiem: "Số 9 Cát Linh",
      Hotline: "15214",
      MaDiemTapKet: 1236,
    },
    {
      TenDiemGiaoDich: "Điểm giao dịch Đống Đa 2",
      MaDiemGiaoDich: 12366,
      DiaDiem: "Số 5 Hoàng Cầu",
      Hotline: "15215",
      MaDiemTapKet: 1236,

    },
    {
      TenDiemGiaoDich: "Điểm giao dịch Đống Đa 3",
      MaDiemGiaoDich: 12367,
      DiaDiem: "Số 6 Hoàng Cầu",
      Hotline: "15216",
      MaDiemTapKet: 1236,
    },
]

const defaultStorageStationList = [
    {
      TenDiemTapKet: "Điểm tập kết Cầu Giấy",
      MaDiemTapKet: 1234,
      DiaDiem: "Số 3 Trần Quốc Hoàn",
      Hotline: "15214",
    },
    {
      TenDiemTapKet: "Điểm tập kết Bắc Từ Liêm",
      MaDiemTapKet: 1235,
      DiaDiem: "Số 6 Cầu Diễn, xã Minh Khai",
      Hotline: "15215",
    },
    {
      TenDiemTapKet: "Điểm tập kết Đống Đa",
      MaDiemTapKet: 1236,
      DiaDiem: "Số 9 Hoàng Cầu",
      Hotline: "15216",
    },
]

  // localStorage.clear()

  localStorage.setItem("userData", JSON.stringify(defaultCustomer));
  localStorage.setItem("Order", JSON.stringify(defaultOrder));
  localStorage.setItem('giaodich', JSON.stringify(defaultTransactionStationList));
  localStorage.setItem('tapket', JSON.stringify(defaultStorageStationList));
  const [activeTab, setActiveTab] = useState("OrderReceive");
  const handleTabClick = (link) => {
    setActiveTab(link);
  };

  return (
    <div>
      <AdminNavbars/>
      <div className="md:flex md:flex-row">
        <LeftNavBar
          className="fixed-left-navbar h-full"
          navItemsProps={navItems}
          changeTabFunc={handleTabClick}
          activeTabProps={activeTab}
        />

        <div className="w-full h-full">
          {activeTab === "OrderReceive" ? <OrderList /> : <OrderListSend/>}
        </div>
      </div>
      {/* <SearchBar /> */}
    </div>
  );
};

export default TransactionStaff;
