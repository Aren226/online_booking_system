from fastapi import FastAPI
from database import Database
from models import Booking

app = FastAPI()
database = Database()

@app.get("/cars")
async def get_all_vehicle():
    data_list = database().get_all_vehicle()
    return {"Message": data_list}

@app.post("/bookings", response_model=Booking)
async def create_booking(booking: Booking):
    insert = database().insert_booking(booking)
    return booking
