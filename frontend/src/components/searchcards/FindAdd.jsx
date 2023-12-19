// MapContainer.js

import { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const FindAdd = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const mapStyles = {
    height: "600px",
    width: "800px",
  };

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

  return (
    <div>
      <div className="grid md:grid-cols-2 grid-cols-1 items-start md:gap-3 gap-1">
        <div>
          <div>
            <input
              className="border border-solid-grey rounded-md mb-10 p-3 w-2/3"
              type="text"
              placeholder="Tìm kiếm..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button
              className="bg-secondary ml-10 p-3 rounded-md text-white hover:bg-white hover:text-primary hover:border hover:border-primary transition-all duration-300"
              onClick=""
            >
              Tìm kiếm
            </button>
          </div>

          <div>
            
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
