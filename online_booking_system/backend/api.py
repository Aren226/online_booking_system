from flask import Flask, jsonify, request, Response
from models.User import User
from models.Vehicle import Vehicle
from models.Booking import Booking
import base64
from PIL import Image
from io import BytesIO
import os
import datetime

app = Flask(__name__)


@app.route("/login", methods=['POST'])
def validate_login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    user = User.get_user_by_email_and_password(email, password)
    return jsonify(user)


@app.route("/bookings", methods=['POST'])
def insert_booking():
    booking_no = Booking.generate_booking_id()
    data = request.get_json()
    new_booking = Booking(
        booking_no=str(booking_no),
        user_id=data['user_id'],
        customer_name=data['customer_name'],
        customer_phone=data['customer_phone'],
        customer_email=data['customer_email'],
        car_id=data['car_id'],
        rental_rate=data['rental_rate'],
        start_date=data['start_date'],
        end_date=data['end_date'],
    )
    booking = Booking.insert_booking(new_booking)
    return jsonify(booking)


@app.route("/cars", methods=['GET'])
def get_all_vehicle():
    vehicles = Vehicle.get_all_vehicle()
    vehicles_dict = [vehicle.to_dict() for vehicle in vehicles]
    print(vehicles_dict)
    return jsonify(vehicles_dict)


@app.route("/cars/<int:id>", methods=['GET'])
def get_vehicle_by_id(id):
    vehicles = Vehicle.get_vehicle_by_id(id)
    return jsonify(vehicles)


@app.route("/new-car", methods=['POST'])
def insert_vehicle():
    data = request.get_json()
    image_file = data['image_url']
    fileName = store_image(image_file)
    new_vehicle = Vehicle(
        model=data['model'],
        plat_number=data['plat_number'],
        price_per_day=data['price_per_day'],
        image_url=fileName,
        specifications=data['specifications'],
    )

    booking = Vehicle.insert_vehicle(new_vehicle)
    return jsonify(booking)


@app.route("/update-car", methods=['POST'])
def update_vehicle():
    data = request.get_json()
    image_file = data['image_url']
    fileName = store_image(image_file)
    vehicle = Vehicle(
        id=data['id'],
        model=data['model'],
        plat_number=data['plat_number'],
        price_per_day=data['price_per_day'],
        image_url=fileName,
        specifications=data['specifications'],
    )

    result = Vehicle.update_vehicle_by_id(vehicle)
    return jsonify(result)


@app.route("/delete-car", methods=['POST'])
def delete_vehicle():
    data = request.get_json()
    id = data['id']
    result = Vehicle.delete_vehicle_by_id(id)
    return jsonify(result)


def store_image(image_url):
    base64_string = image_url
    if base64_string.startswith('data:image/jpeg;base64,'):
        base64_string = base64_string[len('data:image/jpeg;base64,'):]
        image_format = 'jpeg'
    elif base64_string.startswith('data:image/png;base64,'):
        base64_string = base64_string[len('data:image/png;base64,'):]
        image_format = 'png'
    elif base64_string.startswith('data:image/jpg;base64,'):
        base64_string = base64_string[len('data:image/jpg;base64,'):]
        image_format = 'jpg'
    else:
        return image_url

    try:
        # Decode the base64 string
        image_data = base64.b64decode(base64_string)

        # Load the image from binary data
        image = Image.open(BytesIO(image_data))
        suffix = datetime.datetime.now().strftime("%y%m%d_%H%M%S")
        fileName = f"image_{suffix}.{image_format}"
        # Specify the output directory and filename
        output_dir = "../../online_booking_system/frontend/src/assets/vehicles_image"
        output_path = os.path.join(output_dir, fileName)

        # Ensure the output directory exists
        os.makedirs(output_dir, exist_ok=True)

        # Save the image to the local folder
        image.save(output_path, format=image_format)
        return fileName
        print(f"Image saved successfully to {output_path}.")
    except ValueError as e:
        print("Error:", e)
    except Exception as e:
        print("Error saving image file:", e)


if __name__ == "__main__":
    print(Booking.generate_booking_id())
    app.run(debug=True)
