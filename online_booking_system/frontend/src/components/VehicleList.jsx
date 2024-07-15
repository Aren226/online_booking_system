import React, { useState } from "react";
import { FaMapMarker } from "react-icons/fa";
import { Link } from "react-router-dom";
import VehiclePage from "../pages/VehiclePage";

const VehicleList = ({ vehicle }) => {
  const getImage = (vehicle_image) => {
    return new URL(`../assets/vehicles_image/${vehicle_image}`, import.meta.url)
      .href;
  };
  const imageSrc = getImage(vehicle.image_url);
  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        <div className="mb-6">
          <div className="text-gray-600 my-2">{vehicle.model}</div>
          <div className="flex justify-center items-center">
            <img src={getImage(vehicle.image_url)} alt="vehicle" />
          </div>
        </div>

        <div className="mb-5">{vehicle.specification}</div>

        <h3 className="text-indigo-500 mb-2">
          {vehicle.price_per_day} SGD / Day
        </h3>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="text-orange-700 mb-3"></div>
          <Link
            to={`/cars/${vehicle.id}`}
            className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Booking Now
          </Link>
        </div>
      </div>
    </div>
  );
};
export default VehicleList;
