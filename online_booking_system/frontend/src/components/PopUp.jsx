import React, { useState, useEffect } from "react";
import Moment from "moment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PopUp = (props) => {
  const [showModal, setShowModal] = useState(false);
  const formatDate = (date) => {
    if (date) {
      return Moment(date).format("DD/MM/YYYY");
    }
  };
  const startDate = Moment(props.dates[0]);
  const endDate =
    props.dates.length === 2 ? Moment(props.dates[1].toDate()) : startDate;
  const calDiffDate = (startDate, endDate) => {
    return Moment(endDate).diff(Moment(startDate), "days");
  };
  const totalDate = calDiffDate(startDate, endDate) + 1;
  const rentalRate = totalDate * props.vehicle.price_per_day;
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

    if (storedUser) {
      setUserId(storedUser.id);
      setEmail(storedUser.email);
      setPhoneNumber(storedUser.phone_number);
      setUserName(storedUser.username);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirm("Are you sure you want to confirm the booking?")) {
      const bookingData = {
        user_id: userId,
        customer_name: userName,
        customer_phone: phoneNumber,
        customer_email: email,
        car_id: props.vehicle.id,
        rental_rate: rentalRate,
        start_date: formatDate(startDate),
        end_date: formatDate(endDate),
      };
      setShowModal(false);

      fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          if (data) {
            toast.success("Vehicle Reserved Successfully");
            navigate("/");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
        type="button"
        onClick={() =>
          props.dates.length === 0
            ? alert("Please select booking date.")
            : setShowModal(true)
        }
      >
        Booking Now
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full max-w-lg mx-auto mt-8">
              {/* Content */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-300 rounded-t">
                  <h3 className="text-2xl font-semibold text-gray-800">
                    Booking Detail
                  </h3>
                  <button
                    className="text-gray-500 hover:text-gray-700 text-2xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="block h-6 w-6">×</span>
                  </button>
                </div>
                {/* Body */}
                <form onSubmit={handleSubmit}>
                  <div className="p-6 flex flex-col space-y-4">
                    <div className="space-y-2">
                      <div className="text-gray-700">
                        <strong>Vehicle:</strong> {props.vehicle.model}
                      </div>
                      <div className="text-gray-600">
                        <strong>Specifications:</strong>{" "}
                        {props.vehicle.specifications}
                      </div>
                      <div className="text-gray-600">
                        <strong>Price per Day:</strong> $
                        {props.vehicle.price_per_day}
                      </div>
                      <div className="text-gray-600">
                        <strong>Start Date:</strong> {formatDate(startDate)}
                      </div>
                      <div className="text-gray-600">
                        <strong>End Date:</strong> {formatDate(endDate)}
                      </div>
                      <div className="text-gray-600">
                        <strong>Total Days:</strong> {totalDate} days
                      </div>
                      <div className="text-gray-800 font-semibold">
                        <strong>Rental Rate:</strong> ${rentalRate}
                      </div>
                    </div>
                    <div className="border-t border-gray-200 mt-4 pt-4">
                      <div className="text-gray-700 font-semibold mb-2">
                        Customer Details:
                      </div>
                      <div className="space-y-4">
                        <div className="flex flex-col">
                          <label
                            htmlFor="customer_name"
                            className="text-sm font-medium text-gray-600"
                          >
                            Customer Name:
                          </label>
                          <input
                            type="text"
                            id="customer_name"
                            className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="phone_number"
                            className="text-sm font-medium text-gray-600"
                          >
                            Phone Number:
                          </label>
                          <input
                            type="text"
                            id="phone_number"
                            className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="email"
                            className="text-sm font-medium text-gray-600"
                          >
                            Email:
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Footer */}
                  <div className="flex items-center justify-end p-4 border-t border-gray-300 rounded-b">
                    <button
                      className="text-gray-500 hover:text-gray-700 font-bold text-sm px-4 py-2 rounded-md mr-2"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white font-bold text-sm px-4 py-2 rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      type="submit"
                    >
                      Confirm Booking
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

export default PopUp;
