import { useState } from "react";
import Logo from "/src/assets/img/logo_color.png";
import { FaBars, FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";


const IndexNavbars = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navItems = [
    { link: "Trang chủ", path: "" },
    { link: "Dịch vụ", path: "service" },
    { link: "Về chúng tôi", path: "about" },
    { link: "Cảm nhận", path: "feeling" },
  ];


  let navigate = useNavigate(); 
  const login = () =>{ 
    let path = 'login'; 
    navigate(path);
  }

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

          <div className="space-x-12 hidden md:flex items-center">
            <a
              href="signup"
              className="hidden lg:flex items-center hover:text-secondary"
            >
              Đăng ký
            </a>
            <button className="bg-secondary py-2 px-4 transition-all duration-300 rounded hover:text-white hover:bg-indigo-600" onClick={login} >
              Đăng nhập
            </button>
          </div>

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
        className={`space-y-4 px-4 pt-24 pb-5 bg-secondary  ${
          isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"
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
