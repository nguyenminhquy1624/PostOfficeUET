import OrderList from "../components/OrderManagement/OderList";
import { useEffect, useState } from "react";
import { RiAccountBoxLine } from "react-icons/ri";
import AdminNavbars from "../components/navbars/AdminNavbards";
import LeftNavBar from "../components/service/LeftNavBar";
import OrderManagementList from "../components/customer/OrderManagementList";
import axios from "axios";

const CustomerPage = () => {
  const account_info = JSON.parse(localStorage.getItem("account_info"));
  const navItems = [
    {
      link: "Quản lý đơn hàng",
      path: "Order",
      active: false,
      page: <OrderList />,
      icon: <RiAccountBoxLine />,
    },
  ];

  const [activeTab, setActiveTab] = useState("Order");
  const handleTabClick = (link) => {
    setActiveTab(link);
  };

  return (
    <div>
      <AdminNavbars accountInfoProps={account_info} />
      <div className="md:flex md:flex-row">
        <LeftNavBar
          className="fixed-left-navbar h-full"
          navItemsProps={navItems}
          changeTabFunc={handleTabClick}
          activeTabProps={activeTab}
        />

        <div className="w-full h-full">
          {activeTab === "Order" ? <OrderManagementList /> : ""}
        </div>
      </div>
      {/* <SearchBar /> */}
    </div>
  );
};

export default CustomerPage;
