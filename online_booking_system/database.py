import sqlite3
from models import Booking

class Database:
    def __init__(self) -> None:
        self.conn = sqlite3.connect("database.db")
        self.cur = self.conn.cursor()
        self.create_table()

    def create_table(self):
        self.create_booking_table()
        self.create_customer_table()
        self.create_vehicle_table()

    def create_booking_table(self):
        self.cur.execute('''CREATE TABLE IF NOT EXISTS booking (
        bookingId INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
        customerId INTEGER NOT NULL,
        vehicleId INTEGER NOT NULL,
        total_price REAL NOT NULL,
        rentalStartDate NUMERIC NOT NULL,
        rentalEndDate NUMERIC NOT NULL,
        FOREIGN KEY(customerId) REFERENCES customer(custId),
        FOREIGN KEY(vehicleId) REFERENCES vehicle(vehicleId)
        )''')

    def insert_booking(self, booking: Booking):
        try:
            self.cur.execute('''INSERT INTO booking (customerId, vehicleId, total_price, rentalStartDate, rentalEndDate) VALUES (?, ?, ?, ?, ?)''', (booking.customer_id, booking.vehicle_id, booking.total_price, booking.rental_start_date, booking.rental_end_date))
            self.conn.commit()
            self.conn.close()
            return True
        except sqlite3.Error as e:
            print("Insert Booking Error: ", e)
            return False

    def create_customer_table(self):
        self.cur.execute('''CREATE TABLE IF NOT EXISTS customer (
        custId INTEGER PRIMARY KEY AUTOINCREMENT,
        custName TEXT NOT NULL,
        phoneNumber TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE
        )''')

        self.cur.execute('''INSERT INTO customer (custName, email, phoneNumber) VALUES ('Alan', 'alan@gmail.com', '6522324654'), ('Ryan', 'ryan@gmail.com', '65223223654'), ('Lewis', 'lewis@gmail.com', '6527824654')''')
        self.conn.commit()


    def create_vehicle_table(self):
        self.cur.execute('''CREATE TABLE IF NOT EXISTS vehicle (
        vehicleId INTEGER PRIMARY KEY AUTOINCREMENT,
        vehicleNo TEXT NOT NULL UNIQUE,
        vehicleModel TEXT NOT NULL,
        vehicleEngineType TEXT NOT NULL,
        rentalRate REAL NOT NULL
        )''')
        
        self.cur.execute('''INSERT INTO vehicle (vehicleNo, vehicleModel, vehicleEngineType, rentalRate) VALUES ('AAA1234', 'BMW', 'V6', 1500.50), ('AAB1234', 'Audi', 'V4',1000), ('AAC1234', 'Honda', 'V8',2000)''')
        self.conn.commit()


    def get_all_vehicle(self):
        self.cur.execute('''SELECT * FROM vehicle''')
        rows = self.cur.fetchall()
        self.conn.close()
        return rows