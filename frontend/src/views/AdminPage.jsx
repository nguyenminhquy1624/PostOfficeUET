import StorageList from "/src/components/storageManagement/StorageList";
import { useState } from "react";
import AccountList from "../components/AccountManagement/AccountList";
import { FaMapMarkerAlt } from "react-icons/fa";
import { RiAccountBoxLine } from "react-icons/ri";
import { LuLogOut } from "react-icons/lu";
import { FaChartColumn } from "react-icons/fa6";
import AdminNavbars from "../components/navbars/AdminNavbards";
// import ProfileCard from "../components/Profile/ProfileCard";
import Sidebar, { SidebarItem } from "../components/service/SlideBar";
import LeftNavBar from "../components/service/LeftNavBar";
import Logo from "../assets/img/logo_color.png"
const AdminPage = () => {
  const navItems = [
    {
      link: "Quản lý hệ thống",
      path: "SystemManagement",
      active: true,
      page: <StorageList />,
      icon: <FaMapMarkerAlt />,
    },
    {
      link: "Quản lý tài khoản",
      path: "AccountManagement",
      active: false,
      page: <AccountList />,
      icon: <RiAccountBoxLine />,
    },
    {
      link: "Thống kê hàng gửi/nhập",
      path: "LogisticStatistic",
      active: false,
      page: "",
      icon: <FaChartColumn />,
    },
  ];
  const [activeTab, setActiveTab] = useState("SystemManagement");
  const handleTabClick = (link) => {
    // console.log(link)
    // setNavItems(navItems.map((item, index) => (
    //   item.link === link ? item.active = true : item.active = false
    // )))
    // console.log(navItems)
    // navItems.forEach((item) => (item.link === link ? item.active = true : item.active = false))
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
          {activeTab === "SystemManagement" ? <StorageList /> : <AccountList />}
        </div>
      </div>
      {/* <SearchBar /> */}
    </div>
  );
};

export default AdminPage;
