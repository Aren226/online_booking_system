import React, { useState } from "react";
import Moment from "moment";

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
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Booking Detail</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="booking-details">
                    <div className="detail-item">
                      <strong>Vehicle: </strong> {props.vehicle.model}
                    </div>
                    <div className="detail-item">
                      <strong>Specification: </strong>{" "}
                      {props.vehicle.specification}
                    </div>
                    <div className="detail-item">
                      <strong>Price per Day: </strong>
                      {props.vehicle.price_per_day}$
                    </div>
                    <div className="detail-item">
                      <strong>Start Date:</strong> {formatDate(startDate)}
                    </div>
                    <div className="detail-item">
                      <strong>End Date:</strong> {formatDate(endDate)}
                    </div>
                    <div className="detail-item">
                      <strong>Total Date:</strong> {totalDate}
                    </div>
                    <div className="detail-item">
                      <strong>Rental Rate:</strong>
                      {rentalRate}$
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default PopUp;
