import banner from "/src/assets/img/3697355.jpg";
import { HiArrowSmRight } from "react-icons/hi";
import SearchOrderDetail from "../orderdetail/SearchOrderDetail";
import { useState } from "react";



export const CardSearch = () => {
  const [maVanDon, setMaVanDon] = useState("");
  const [isDetail, setIsDetail] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const handleInputChange = (event) => {
    setMaVanDon(event.target.value);
  };

  const whenClick = () => {
    if (maVanDon === "nhat") {
      setIsDetail(true);
      console.log(maVanDon);
    } else {
      setIsHidden(false);
    }
  };
  return (
    <div>
      {isDetail ? <SearchOrderDetail/> : <div className="p-10 ">
        <h1 className="font-bold text-2xl">Mã phiếu gửi</h1>
        <div className="flex justify-between flex-col lg:flex-row">
          <div className="w-1/2 mt-5">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="yourInput"
              type="text"
              placeholder="Mã vận đơn"
              value={maVanDon}
              onChange={handleInputChange}
            />
            {isHidden? <h4></h4> : <h4 className="text-red-500 pt-5 pl-1">Mã vận đơn không đúng. Vui lòng nhập lại!!</h4>}
            
            <div>
              <button
                className="flex items-center mt-20 py-3 px-8 bg-secondary font-semibold text-white rounded hover:bg-white hover:text-primary hover:border hover:border-primary transition-all duration-300"
                onClick={whenClick}
              >
                <span className="mr-3">Tra cứu </span>
                <HiArrowSmRight />
              </button>
            </div>
          </div>
          <div>
            <img src={banner} className="lg:h-[500px] mr-12" />
          </div>
        </div>
      </div>}
      
    </div>
  );
};
