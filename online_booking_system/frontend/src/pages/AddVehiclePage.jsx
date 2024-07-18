import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddVehiclePage = () => {
  const navigate = useNavigate();
  const storedRole = localStorage.getItem("role");
  useEffect(() => {
    if (storedRole !== "admin") {
      navigate("/");
    }
  });

  const [model, setModel] = useState("");
  const [plat_number, setPlatNumber] = useState("");
  const [price_per_day, setPricePerDay] = useState("");
  const [image, setImage] = useState(null);
  const [specifications, setSpecifications] = useState("");

  const handleImageChange = (e) => {
    const data = new FileReader();
    data.addEventListener("load", () => {
      setImage(data.result);
    });
    data.readAsDataURL(e.target.files[0]);
  };

  const submitForm = (e) => {
    e.preventDefault();
    const vehicleData = {
      model: model,
      plat_number: plat_number,
      price_per_day: price_per_day,
      image_url: image,
      specifications: specifications,
    };

    fetch("/api/new-car", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vehicleData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data) {
          toast.success("New Vehicle Added Successfully");
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">Add Car</h2>

            <div className="mb-4">
              <label
                htmlFor="model"
                className="block text-gray-700 font-bold mb-2"
              >
                Car Model
              </label>
              <input
                type="text"
                id="model"
                name="model"
                className="border rounded w-full py-2 px-3"
                required
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="plat_number"
                className="block text-gray-700 font-bold mb-2"
              >
                Plate Number
              </label>
              <input
                type="text"
                id="plat_number"
                name="plat_number"
                className="border rounded w-full py-2 px-3"
                required
                value={plat_number}
                onChange={(e) => setPlatNumber(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="price_per_day"
                className="block text-gray-700 font-bold mb-2"
              >
                Price Per Day
              </label>
              <input
                type="number"
                id="price_per_day"
                name="price_per_day"
                className="border rounded w-full py-2 px-3"
                required
                step={0.01}
                min={0}
                value={price_per_day}
                onChange={(e) => setPricePerDay(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-gray-700 font-bold mb-2"
              >
                Upload Image
              </label>
              <img src={image} />
              <input
                type="file"
                id="image"
                name="image"
                accept=".jpg, .png, .jpeg"
                className="border rounded w-full py-2 px-3"
                onChange={handleImageChange}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="specifications"
                className="block text-gray-700 font-bold mb-2"
              >
                Specifications
              </label>
              <textarea
                id="specifications"
                name="specifications"
                className="border rounded w-full py-2 px-3"
                rows="4"
                required
                value={specifications}
                onChange={(e) => setSpecifications(e.target.value)}
              ></textarea>
            </div>

            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Car
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddVehiclePage;
