import StorageList from '/src/components/storageManagement/StorageList'
import { FooterWithSocialLinks } from '/src/components/footer/Footers'
import IndexNavbars from '/src/components/navbars/IndexNavbars'
import LeftNavBar from '../components/service/LeftNavBar'
import { useState } from 'react'

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
        <LeftNavBar navItemsProps={navItems} changeTabFunc={handleTabClick} activeTabProps={activeTab}/>
        <StorageList className="z-10"/>
      </div>
      {/* <SearchBar /> */}
      
      <FooterWithSocialLinks/>
    </div>
  )
}

export default AdminPage