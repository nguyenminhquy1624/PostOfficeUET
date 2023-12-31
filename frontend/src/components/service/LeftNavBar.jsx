import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import {PropTypes} from 'prop-types'

// import { useNavigate } from "react-router-dom";

const LeftNavBar = (props) => {

    const navItems = props.navItemsProps
    const handleTabClick = props.changeTabFunc
    let activeTab = props.activeTabProps
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // let navigate = useNavigate(); 

    return (
        <div className="bg-slate-100 relative">
            <nav className="hidden md:block md:w-fit max-h-full  text-primary top-0 left-0  mt-[100px]">
                <div className="text-lg container my-auto flex justify-between items-center font-[500]">
                    <div className="flex items-center">
                        {/* showing nav items using map*/}
                        <ul className="flex-col text-center">
                            {navItems.map(({ link, path }) => (
                                <a 
                                key={link} 
                                // href={path}
                                onClick={() => handleTabClick(path)}

                                className={`px-8 py-3 block cursor-pointer transition-all duration-300 hover:text-primary hover:bg-indigo-200 rounded-sm ${activeTab === path ? "gradientButton text-white": ""}`}>
                                {link}
                                </a>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
            {/* Only display in mobile */}
            <nav className={`${isMenuOpen ? "" : "-translate-x-[100%]"} bg-white shadow-md md:w-fit mt-[80px] h-full border-b text-primary fixed top-0 left-0`}>
                <div className="text-lg container my-auto flex justify-between font-[500]">
                    <div className="flex items-center">
                        {/* showing nav items using map*/}
                        <ul className={`md:flex-col space-y-2`}>
                            {navItems.map(({ link, path }) => (
                                <a 
                                key={link} 
                                // href={path}
                                onClick={() => handleTabClick(path)} 
                                className={`px-8 py-3 block transition-all duration-300 hover:text-primary text-center hover:bg-indigo-200 rounded-sm ${activeTab === path ? "gradientButton text-white": ""}`}>
                                {link}
                                </a>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className={`${isMenuOpen ? "" : "translate-x-[100%]"} absolute top-[30%] right-0 md:hidden`}>
                    <button
                    onClick={toggleMenu}
                    className="text-white text-lg focus:outline-none focus:text-gray-300"
                    >
                    {isMenuOpen ? (
                        <FaChevronLeft className="w-6 h-6 text-primary" />
                    ) : (
                        <FaChevronRight className="w-6 h-6 text-primary" />
                    )}
                    </button>
                </div>
                
            </nav>
        </div>
    )

}

LeftNavBar.propTypes = {
    navItemsProps: PropTypes.array.isRequired,
    changeTabFunc: PropTypes.func.isRequired,
    activeTabProps: PropTypes.string.isRequired
}
export default LeftNavBar