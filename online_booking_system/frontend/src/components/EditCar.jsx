import React, { useState, useEffect } from "react";
import Moment from "moment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditCar = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [model, setModel] = useState("");
  const [plat_number, setPlatNumber] = useState("");
  const [price_per_day, setPricePerDay] = useState("");
  const [image, setImage] = useState(null);
  const [specifications, setSpecifications] = useState("");
  
  const navigate = useNavigate();
  const storedRole = localStorage.getItem("role");
  useEffect(() => {
    if (storedRole !== "admin") {
      navigate("/");
    }

    setModel(props.vehicle.model)
    setPlatNumber(props.vehicle.plat_number)
    setPricePerDay(props.vehicle.price_per_day)
    setSpecifications(props.vehicle.specifications)
    setImage(props.vehicle.image_url)
  }, [props]);
  console.log(props.vehicle)
  const getImage = (image) => {
    return new URL(`../assets/vehicles_image/${image}`, import.meta.url)
      .href;
  };
  console.log("image: ", image)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirm("Are you confirm to update the car details?")) {
      const vehicleData = {
        id: props.vehicle.id,
        model: model,
        plat_number: plat_number,
        price_per_day: price_per_day,
        image_url: image,
        specifications: specifications
      };
      setShowModal(false);

      fetch("/api/update-car", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehicleData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          if(data){
            toast.success("Vehicle Updated Successfully");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  const handleImageChange = (e) => {
    const data = new FileReader();
    data.addEventListener("load", () => {
      setImage(data.result);
    });
    data.readAsDataURL(e.target.files[0]);
  };
  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Edit
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full max-w-lg mx-auto mt-8">
              {/* Content */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-300 rounded-t">
            <h3 className="text-2xl font-semibold text-gray-800">Edit</h3>
            <button
              className="text-gray-500 hover:text-gray-700 text-2xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => setShowModal(false)}
            >
              <span className="block h-6 w-6">×</span>
            </button>
          </div>
          {/* Modal Body */}
          <form onSubmit={handleSubmit}>
            <div className="p-4">
              {/* Car Model */}
              <div className="mb-4">
                <label htmlFor="model" className="block text-gray-700 font-bold mb-2">Car Model</label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                />
              </div>
              {/* Plate Number */}
              <div className="mb-4">
                <label htmlFor="plat_number" className="block text-gray-700 font-bold mb-2">Plate Number</label>
                <input
                  type="text"
                  id="plat_number"
                  name="plat_number"
                  className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                  value={plat_number}
                  onChange={(e) => setPlatNumber(e.target.value)}
                />
              </div>
              {/* Price Per Day */}
              <div className="mb-4">
                <label htmlFor="price_per_day" className="block text-gray-700 font-bold mb-2">Price Per Day</label>
                <input
                  type="number"
                  id="price_per_day"
                  name="price_per_day"
                  className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                  pattern="\d+(\.\d{1,2})?"
                  step={0.10}
                  min={0}
                  value={price_per_day}
                  onChange={(e) => setPricePerDay(e.target.value)}
                />
              </div>
              {/* Upload Image */}
              <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Upload Image</label>
                <img src={image===props.vehicle.image_url?getImage(image):image} alt="Preview" className="mb-2 rounded-md shadow-md" />
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept=".jpg, .png, .jpeg"
                  className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  onChange={handleImageChange}
                />
              </div>
              {/* Specifications */}
              <div className="mb-4">
                <label htmlFor="specifications" className="block text-gray-700 font-bold mb-2">Specifications</label>
                <textarea
                  id="specifications"
                  name="specifications"
                  className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  rows="4"
                  required
                  value={specifications}
                  onChange={(e) => setSpecifications(e.target.value)}
                ></textarea>
              </div>
            </div>
            {/* Modal Footer */}
            <div className="flex items-center justify-end p-4 border-t border-gray-300 rounded-b">
              <button
                className="text-gray-500 hover:text-gray-700 font-bold text-sm px-4 py-2 rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white font-bold text-sm px-4 py-2 rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                type="submit"
              >
                Update
              </button>
            </div>
          </form>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default EditCar;
