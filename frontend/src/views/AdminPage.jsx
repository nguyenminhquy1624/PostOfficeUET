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
  const [activeTab, setActiveTab] = useState("SystemManagement")

  const handleTabClick = (value) => {
    setActiveTab(value);
  }

  return (
    <div>
      <IndexNavbars/>
      <div className="md:flex md:flex-row">
        <LeftNavBar  className="fixed-left-navbar\" navItemsProps={navItems} changeTabFunc={handleTabClick} activeTabProps={activeTab}/>
        {activeTab === 'SystemManagement' ? <StorageList/> : <AccountList/>}
      </div>
      {/* <SearchBar /> */}

    </div>
  )
}

export default AdminPage