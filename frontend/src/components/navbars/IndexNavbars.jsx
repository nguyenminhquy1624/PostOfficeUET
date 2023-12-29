import { useState, useEffect } from "react";
import Logo from "/src/assets/img/logo_color.png";
import { FaBars, FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Avatar, Dropdown, Menu } from "antd";
import avt from "../../assets/img/church.jpg";
import axios from "axios";
const IndexNavbars = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false)

  const [showProfile, setShowProfile] = useState(false);


  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
    }
  }, [isAuth])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const account_info = JSON.parse(localStorage.getItem("account_info"))

  
  let navItems = [
    { link: "Trang chủ", path: "" },
    { link: "Dịch vụ", path: "service" },
    { link: "Về chúng tôi", path: "about" },
    { link: "Cảm nhận", path: "feeling" },
  ];

  if (isAuth) {
    if (account_info.LoaiTaiKhoan !== null) {
      console.log("LoaiTaiKhoan: ", account_info.LoaiTaiKhoan)
      if (account_info.LoaiTaiKhoan === 1) {
        navItems = [
          {link: "Quản lý hệ thống", path: "admin"}
        ]
      }
      if (account_info.LoaiTaiKhoan === 2) {
        navItems = [
          {link: "Quản lý điểm giao dịch", path: "transactionLeader"}
        ]
      }
      if (account_info.LoaiTaiKhoan === 3) {
        navItems = [
          {link: "Quản lý đơn hàng", path: "transactionStaff"}
        ]
      }
      if (account_info.LoaiTaiKhoan === 4) {
        navItems = [
          {link: "Quản lý điểm tập kết", path: "storageLeader"}
        ]
      }
      if (account_info.LoaiTaiKhoan === 5) {
        navItems = [
          {link: "Quản lý đơn hàng", path: "storageStaff"}
        ]
      }
      else {
        navItems = [
          {link: "Quản lý đơn hàng", path: ""}
        ]
      }
    }
    else {
      navItems = [
        {link: "Quản lý đơn hàng", path: ""}
      ]
    }
  }
  
  const login = () => {
    let path = '/login';
    navigate(path);
  }

  const logout = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/account/logout/',
        {
          'jwt': localStorage.getItem('access_token')
        })
      localStorage.clear()
      alert("Đăng xuất thành công")
      console.log("logout data: ", response.data)
      window.location.reload();
    } catch (err) {
      alert("Đăng xuất thất bại")
      console.log("logout err: ", err)
    }
  }


  const menu = (
    <Menu className="relative p-10 h-100 w-100">
      <Menu.Item key="profile" onClick={() => setShowProfile(!showProfile)}>
        Thông tin tài khoản
      </Menu.Item>
      <Menu.Item key="settings">Thay đổi mật khẩu</Menu.Item>
      <Menu.Item key="logout" onClick={logout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <nav className="bg-white md:px-4 p-4 w-full border-b mx-auto text-primary fixed right-0 top-0 left-0 shadow-md">
        <div className="text-lg container mx-auto flex justify-between items-center font-[500]">
          <div className="flex space-x-14 items-center">
            <a
              href="/"
              className="text-2xl font-semibold flex items-center text-primary"
            >
              <img
                src={Logo}
                alt=""
                className="h-12 inline-block items-center"
              />
            </a>

            {/* showing nav items using map*/}
            <ul className="md:flex space-x-12 hidden">
              {navItems.map(({ link, path }) => (
                <a key={link} href={path} className="block hover:text-gray-300">
                  {link}
                </a>
              ))}
            </ul>
          </div>
          {!isAuth ?
            <div className="space-x-12 hidden md:flex items-center">
              <a
                href="/signup"
                className="hidden lg:flex items-center hover:text-secondary"
              >
                Đăng ký
              </a>
              <button className="bg-secondary py-2 px-4 transition-all duration-300 rounded hover:text-white hover:bg-indigo-600" onClick={login} >
                Đăng nhập
              </button>
            </div> :
            <div className="hidden md:flex items-center">
              <div className="m-5 font-bold">
                <span>Admin</span>
              </div>
              <div >
                <Dropdown overlay={menu} placement="bottomRight" arrow className="">
                  <Avatar
                    size={50}
                    style={{ cursor: "pointer" }}
                    className={`flex items-center h-50 rounded-full overflow-hidden`}
                  >
                    <img className="w-full h-full object-cover" src={avt} />
                  </Avatar>
                </Dropdown>
              </div>
            </div>}
          {/* Only display in mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white text-lg focus:outline-none focus:text-gray-300"
            >
              {isMenuOpen ? (
                <FaXmark className="w-6 h-6 text-primary" />
              ) : (
                <FaBars className="w-6 h-6 text-primary" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`space-y-4 px-4 pt-24 pb-5 bg-secondary  ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"
          }`}
      >
        {navItems.map(({ link, path }) => (
          <a key={link} href={path} className="block hover:text-gray-300">
            {link}
          </a>
        ))}
      </div>
    </>
  );
};

export default IndexNavbars;
