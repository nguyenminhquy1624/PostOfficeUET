import Logo from "/src/assets/img/logo_color.png";
// import { Avatar } from "flowbite-react";
// import { Dropdown } from "flowbite-react";
import { Avatar, Dropdown, Menu } from "antd";
// import '/frontend/node_modules/antd/dist/antd.css'
import { useNavigate } from "react-router-dom";
import avt from "../../assets/img/church.jpg";
import { useState } from "react";

const AdminNavbars = (props) => {

  const navItems = props.navItemsProps
  const [showProfile, setShowProfile] = useState(false);

  let navigate = useNavigate();

  const logout = () => {
    navigate("/login");
  };

  const openProfile = () => {
    setShowProfile(true);
  }
  const menu = (
    <Menu className="relative p-10 h-100 w-100">
      <Menu.Item key="profile" onClick={openProfile}>
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
      <nav className="bg-white md:px-4 p-2 w-full border-b mx-auto text-primary fixed right-0 top-0 left-0 shadow-md">
        <div className="text-lg container mx-auto flex justify-between items-center font-[500]">
          <div className="flex items-center">
            <a
              href="/admin"
              className="text-2xl font-semibold pr-40 flex items-center text-primary"
            >
              <img
                src={Logo}
                alt=""
                className="h-12 inline-block items-center"
              />
            </a>

            {/* showing nav items using map*/}
            {/* <ul className="md:flex space-x-12 hidden">
              {navItems.map(({ link, path }) => (
                <a key={link} href={path} className="block hover:text-gray-300">
                  {link}
                </a>
              ))}
            </ul> */}
          </div>

          <div className="hidden md:flex items-center">
            {/* <a
              href="signup"
              className="hidden lg:flex items-center hover:text-secondary"
            >
              Đăng ký
            </a> */}
            {/* <button className="bg-secondary py-2 px-4 transition-all duration-300 rounded hover:text-white hover:bg-indigo-600" onClick={login} >
              Đăng nhập
            </button> */}
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
          </div>

          {/* Only display in mobile */}
          {/* <div className="md:hidden">
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
          </div> */}
        </div>
      </nav>

      {/* <div
        className={`space-y-4 px-4 pt-24 pb-5 bg-secondary  ${
          isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"
        }`}
      >
        {navItems.map(({ link, path }) => (
          <a key={link} href={path} className="block hover:text-gray-300">
            {link}
          </a>
        ))}
      </div> */}
    </>
  );
};

export default AdminNavbars;
