from fastapi import FastAPI
from database import Database
from models import Booking

app = FastAPI()
posts = []

@app.get("/cars")
async def get_all_vehicle():
    data_list = Database().get_all_vehicle()
    return {"Message": data_list}

@app.post("/bookings", response_model=Booking)
async def create_booking(booking: Booking):
    insert = Database().insert_booking(booking)
    return booking