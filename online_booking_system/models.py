from pydantic import BaseModel
from datetime import datetime

class Vehicle(BaseModel):
    id : int = None
    no : str
    model : str
    engine_type : str
    rental_rate : float

class Customer(BaseModel):
    id : int = None
    name : str
    phone_number : str
    email : str

class Booking(BaseModel):
    id : int = None
    customer_id : int
    vehicle_id : int
    total_price : float
    rental_start_date : datetime
    rental_end_date: datetime

    