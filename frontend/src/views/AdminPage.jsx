import StorageList from '/src/components/storageManagement/StorageList'
import IndexNavbars from '/src/components/navbars/IndexNavbars'
import LeftNavBar from '../components/service/LeftNavBar'
import { useState } from 'react'
import AccountList from '../components/AccountManagement/AccountList'

const AdminPage = () => {
  const navItems = [
    { link: "Quản lý hệ thống", path: "SystemManagement", active: true},
    { link: "Quản lý tài khoản", path: "AccountManagement" , active: false},
    { link: "Thống kê hàng gửi/nhập", path: "LogisticStatistic" , active: false},];
  if (localStorage.getItem("adminActiveTab") == null) {
    localStorage.setItem("adminActiveTab", JSON.stringify("SystemManagement"))
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
        {activeTab === "SystemManagement" && <StorageList className="z-10"/>}
        {activeTab === "AccountManagement" && <AccountList className="z-10" />}
      </div>
      {/* <SearchBar /> */}

    </div>
  )
}

export default AdminPage