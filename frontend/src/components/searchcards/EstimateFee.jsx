import { HiArrowSmRight } from "react-icons/hi";
import { useState, useEffect } from "react";
const EstimateFee = () => {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [city_from, setCityFrom] = useState('');
  const [city_to, setCityTo] = useState('');
  const [district_from, setDistrictFrom] = useState('');
  const [district_to, setDistrictTo] = useState('');
  useEffect(() => {
    // Thực hiện yêu cầu HTTP khi component được mount
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
        );
        const data = await response.json();
        renderCity(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // [] đảm bảo rằng useEffect chỉ chạy một lần khi component được mount

  const renderCity = (data) => {
    setCities(data);
    const handleCityChangeFrom = (selectedCityId) => {
      const selectedCity = data.find((city) => city.Id === selectedCityId);
      setDistricts(selectedCity.Districts);
      setWards([]);
    };

    const handleCityChangeTo = (selectedCityId) => {
      const selectedCity = data.find((city) => city.Id === selectedCityId);
      setDistricts(selectedCity.Districts);
      setWards([]);
    };

    const handleDistrictChangeFrom = (selectedDistrictId) => {
      const selectedCity = data.find((city) => city.Id === cities);
      const selectedDistrict = selectedCity.Districts.find(
        (district) => district.Id === selectedDistrictId
      );
      setWards(selectedDistrict.Wards);
    };

    const handleDistrictChangeTo = (selectedDistrictId) => {
      const selectedCity = data.find((city) => city.Id === cities);
      const selectedDistrict = selectedCity.Districts.find(
        (district) => district.Id === selectedDistrictId
      );
      setWards(selectedDistrict.Wards);
    };
      
    document.getElementById("city_from").onchange = function () {
      handleCityChangeFrom(this.value);
      setCityFrom(this.value);
    };

    document.getElementById("district_from").onchange = function () {
      handleDistrictChangeFrom(this.value);
      setDistrictFrom(this.value);
    };

    document.getElementById("city_to").onchange = function () {
      handleCityChangeTo(this.value);
      setCityTo(this.value);
    };

    document.getElementById("district_to").onchange = function () {
      handleDistrictChangeTo(this.value);
      setDistrictTo(this.value);
    };
  };

  const fullForm = () => {
    setIsDone(true)
  }
  
  return (
    <div className="p-10">
      <div className="flex justify-between">
        <div className=" mt-5">
          <div className="flex items-center justify-between flex-col lg:flex-row ">
            <h4 className="pt-5">Gửi từ *</h4>
            <div className="lg:w-[600px] pl-20 md:w-1/2 sm:w-1/3 ">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select an option
              </label>
              <select
                id="city_from"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" selected>
                  Chọn tỉnh thành
                </option>
                {cities.map((city) => (
                  <option key={city.Id} value={city.Id}>
                    {city.Name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center lg:justify-between flex-col lg:flex-row">
            <h4 className="pt-5">Quận/Huyện *</h4>
            <div className="lg:w-[600px] pl-20 md:w-1/2 sm:w-1/3 ">
              <label
                htmlFor=""
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select an option
              </label>
              <select
                id="district_from"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" selected>
                  Chọn quận huyện
                </option>
                {districts.map((district) => (
                  <option key={district.Id} value={district.Id}>
                    {district.Name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center lg:justify-between flex-col lg:flex-row">
            <h4 className="pt-5">Gửi đến *</h4>
            <div className="lg:w-[600px] pl-20 md:w-1/2 sm:w-1/3 ">
              <label
                htmlFor=""
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select an option
              </label>
              <select
                id="city_to"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" selected>
                  Chọn tỉnh thành
                </option>
                {cities.map((city) => (
                  <option key={city.Id} value={city.Id}>
                    {city.Name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center lg:justify-between flex-col lg:flex-row">
            <h4 className="pt-5">Quận/Huyện *</h4>
            <div className="lg:w-[600px] pl-20 md:w-1/2 sm:w-1/3 ">
              <label
                htmlFor=""
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select an option
              </label>
              <select
                id="district_to"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" selected>
                  Chọn quận huyện
                </option>
                {districts.map((district) => (
                  <option key={district.Id} value={district.Id}>
                    {district.Name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center lg:justify-between flex-col lg:flex-row">
            <h4 className="pt-5">Trọng lượng (gram) *</h4>
            <div className="lg:w-[600px] pl-20 md:w-1/2 sm:w-1/3 ">
              <form className="">
                <label
                  htmlFor="number-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select a number:
                </label>
                <input
                  type="number"
                  id="number-input"
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="90210"
                  required
                />
              </form>
            </div>
          </div>

          <div className="flex items-center lg:justify-between flex-col lg:flex-row">
            <h4 className="pt-5">Số tiền thu hộ (VNĐ) *</h4>
            <div className="w-[600px] pl-20">
              <form className="">
                <label
                  htmlFor="number-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select a number:
                </label>
                <input
                  type="number"
                  id="number-input"
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="90210"
                  required
                />
              </form>
            </div>            
          </div>
          {isDone ? <h1 className="pt-10 text-xl text-red-600 font-bold">Ước tính phí khoảng: 50.000 VNĐ</h1> : ''}
          
          <div>
            <button onClick={fullForm} className="flex items-center mt-20 py-3 px-8 bg-secondary font-semibold text-white rounded hover:bg-white hover:text-primary hover:border hover:border-primary transition-all duration-300">
              <span className="mr-3">Tra cứu </span>
              <HiArrowSmRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimateFee;
