from flask import Flask, jsonify, request, Response
from models.User import User
from models.Vehicle import Vehicle
from models.Booking import Booking

app = Flask(__name__)

@app.route("/cars", methods=['GET'])
def get_all_vehicle():
    vehicles = Vehicle.get_all_vehicle()
    vehicles_dict = [vehicle.to_dict() for vehicle in vehicles]
    return jsonify(vehicles_dict)

@app.route("/cars/<int:id>", methods=['GET'])
def get_vehicle_by_id(id):
    vehicles = Vehicle.get_vehicle_by_id(id)
    vehicles_dict = [vehicle.to_dict() for vehicle in vehicles]
    return jsonify(vehicles_dict)

# @app.post("/bookings", response_model=Booking)
# async def create_booking(booking: Booking):
#     # insert = Database().insert_booking(booking)
#     return booking


if __name__ == "__main__":
    app.run(debug=True)
