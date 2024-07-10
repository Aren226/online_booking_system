import sqlite3
import os
import time


def create_table():
    try:
        if os.path.exists("database.db"):
            os.remove("database.db")
            print("removed")
            
        conn = sqlite3.connect("database.db")
        cursor = conn.cursor()
        cursor.execute('''CREATE TABLE IF NOT EXISTS customer (
			custId INTEGER PRIMARY KEY AUTOINCREMENT,
			custName TEXT NOT NULL,
			phoneNumber TEXT NOT NULL UNIQUE,
			email TEXT NOT NULL UNIQUE
			)''')

        cursor.execute('''CREATE TABLE IF NOT EXISTS vehicle (
			vehicleId INTEGER PRIMARY KEY AUTOINCREMENT,
			vehicleNo TEXT NOT NULL UNIQUE,
			vehicleModel TEXT NOT NULL,
			vehicleEngineType TEXT NOT NULL,
			rentalRate REAL NOT NULL
			)''')

        cursor.execute('''CREATE TABLE IF NOT EXISTS booking (
			bookingId INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
			customerId INTEGER NOT NULL,
			vehicleId INTEGER NOT NULL,
			rentalRate REAL NOT NULL,
			rentalStartDate NUMERIC NOT NULL,
			rentalEndDate NUMERIC NOT NULL,
			FOREIGN KEY(customerId) REFERENCES customer(custId),
			FOREIGN KEY(vehicleId) REFERENCES vehicle(vehicleId)
			)''')

        print("successful create database")

        cursor.execute('''INSERT INTO vehicle (vehicleNo, vehicleModel, vehicleEngineType, rentalRate) VALUES ('AAA1234', 'BMW', 'V6', 1500.50), ('AAB1234', 'Audi', 'V4',1000), ('AAC1234', 'Honda', 'V8',2000)''')
        print("successful insert vehicle")
		
        cursor.execute('''INSERT INTO customer (custName, email, phoneNumber) VALUES ('Alan', 'alan@gmail.com', '6522324654'), ('Ryan', 'ryan@gmail.com', '65223223654'), ('Lewis', 'lewis@gmail.com', '6527824654')''')
        print("successful insert customer")
        
        conn.commit()
    except sqlite3.Error as e:
        print("Database error: ", e)
    finally:
        conn.close

create_table()
