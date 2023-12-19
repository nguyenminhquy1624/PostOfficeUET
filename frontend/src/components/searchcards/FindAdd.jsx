// MapContainer.js

import { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const FindAdd = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const defaultCenter = {
    lat: 21.0285,
    lng: 105.8542,
  };

  const locations = [
    {
      name: "post 1",
      location: {
        lat: 21.0185,
        lng: 105.8542,
      },
    },

    {
      name: "post 2",
      location: {
        lat: 21.0285,
        lng: 105.8142,
      },
    },
  ];

  // const items = Array.from({ length: 20 }, (_, index) => `Item ${index + 1}`);
  const [searchTerm, setSearchTerm] = useState("");
  const items = [
    {
      name: "Bưu cục Cầu Giấy",
      address: "10 Xuân Thủy, Cầu Giấy",
      hotline: "19008198",
      distance: '1 km'
    },

    {
      name: "Bưu cục HQV",
      address: "10 Hoàng Quốc Việt, Cầu Giấy",
      hotline: "19008199",
      distance: '1.5 km'
    },

    { name: "Bưu cục Cổ Nhuế", address: "23 Cổ Nhuế", hotline: "19008120", distance:'4.3 km' },

    {
      name: "Bưu cục Quan Hoa",
      address: "10 Quan Hoa, Cầu Giấy",
      hotline: "19008121",
      distance: '2.6 km'
    },

    {
      name: "Bưu cục Nguyễn Khánh Toàn",
      address: "90 Nguyễn Khánh Toàn, Cầu Giấy",
      hotline: "19008122",
      distance: '1.9 km'
    },

    {
      name: "Bưu cục Cầu Giấy 2",
      address: "144 Xuân Thủy, Cầu Giấy",
      hotline: "19008123",
      distance: '1.2 km'
    },
  ];

  // Lọc danh sách dựa trên giá trị của ô tìm kiếm
  const filteredItems = items.filter((item) =>
    item.address.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      <div className="grid md:grid-cols-2 grid-cols-1 items-start md:gap-3 gap-1">
        <div>
          <div className="">
            <input
              className="border border-solid-grey rounded-md mb-10 p-3 w-3/4"
              type="text"
              placeholder="Bạn đang ở đâu ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-secondary ml-10 p-3 rounded-md text-white hover:bg-white hover:text-primary hover:border hover:border-primary transition-all duration-300"
              onClick=""
            >
              Tìm kiếm
            </button>
          </div>

          <div>
            <div
              className="border border-solid-gray shadow-md p-2 mt-2"
              style={{ height: "500px", overflowY: "auto" }}
            >
              <ul>
                {filteredItems.map((item, index) => (
                  <li key={index}>
                    <div className="border-2 border-solid rounded-md shadow-sm p-3 m-2 hover:bg-slate-100">
                      <h2 className="text-primary text-md font-bold">
                        {item.name}
                      </h2>
                      <h3>Địa chỉ: {item.address}</h3>
                      <div className="flex justify-between">
                        <h3>Hotline: {item.hotline}</h3>
                        <h3 className="italic">
                          Khoảng cách: {item.distance}
                        </h3>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="">
          <LoadScript googleMapsApiKey="AIzaSyBaO1wDfpjgM7ZwGyaLr5ZPYaoIgAsHXUA">
            <GoogleMap
              mapContainerStyle={{ height: "600px", width: "100%" }}
              zoom={13}
              center={defaultCenter}
            >
              {locations.map((location, index) => (
                <Marker
                  key={index}
                  position={location.location}
                  label={location.name}
                />
              ))}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
};

export default FindAdd;
// AIzaSyBaO1wDfpjgM7ZwGyaLr5ZPYaoIgAsHXUA
