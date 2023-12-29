import OrderList from "../components/OrderManagement/OderList";
import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { RiAccountBoxLine } from "react-icons/ri";
import AdminNavbars from "../components/navbars/AdminNavbards";
import LeftNavBar from "../components/service/LeftNavBar";
import OrderListSend from "../components/OrderManagement/OderListSend";
import StorageList from "../components/storageManagement/StorageList";
import StorageListSend from "../components/storageManagement/StorageListSend";
const TransactionStaff = () => {
  const account_info = JSON.parse(localStorage.getItem("account_info"))
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

 
  const [activeTab, setActiveTab] = useState("OrderReceive");
  const handleTabClick = (link) => {
    setActiveTab(link);
  };

  return (
    <div>
      <AdminNavbars accountInfoProps={account_info}/>
      <div className="md:flex md:flex-row">
        <LeftNavBar
          className="fixed-left-navbar h-full"
          navItemsProps={navItems}
          changeTabFunc={handleTabClick}
          activeTabProps={activeTab}
        />

        <div className="w-full h-full">
          {activeTab === "OrderReceive" ? <StorageList /> : <StorageListSend/>}
        </div>
      </div>
      {/* <SearchBar /> */}
    </div>
  );
};

export default TransactionStaff;
