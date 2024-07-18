import sqlite3
import os


def create_connection():
    try:
        conn = sqlite3.connect("database.db")
    except sqlite3.Error as e:
        print("Connection db error: ", e)
    finally:
        return conn

def create_database():
    if os.path.exists("database.db"):
        os.remove("database.db")

    try:
        conn = create_connection()
        cursor = conn.cursor()
        cursor.execute('''CREATE TABLE IF NOT EXISTS vehicles (
                       id INTEGER PRIMARY KEY AUTOINCREMENT,
                       model TEXT NOT NULL,
                       plat_number TEXT NOT NULL UNIQUE,
                       price_per_day REAL NOT NULL,
                       image_url TEXT NOT NULL,
                       specifications TEXT NOT NULL,
                       is_deleted INTEGER NOT NULL
                       );''')

        cursor.execute('''CREATE TABLE IF NOT EXISTS bookings (
                       id INTEGER PRIMARY KEY AUTOINCREMENT,
                       booking_no TEXT NOT NULL UNIQUE,
                       user_id TEXT NOT NULL,
                       customer_name TEXT NOT NULL,
                       customer_phone TEXT NOT NULL,
                       customer_email TEXT NOT NULL,
                       car_id INTEGER NOT NULL,
                       rental_rate REAL NOT NULL,
                       start_date DATE NOT NULL,
                       end_date DATE NOT NULL,
                       is_deleted INTEGER NOT NULL,
                       FOREIGN KEY (car_id) REFERENCES cars (id)
                       FOREIGN KEY (user_id) REFERENCES users (id)
                       );''')

        cursor.execute('''CREATE TABLE IF NOT EXISTS users (
                       id INTEGER PRIMARY KEY AUTOINCREMENT,
                       username TEXT NOT NULL UNIQUE,
                       password TEXT NOT NULL,
                       phone_number TEXT NOT NULL UNIQUE,
                       email TEXT NOT NULL UNIQUE,
                       is_deleted INTEGER NOT NULL
                       );''')

        conn.commit()
        print("successful create database")

        cursor.execute('''INSERT INTO vehicles (model, plat_number, price_per_day, image_url, specifications, is_deleted)
                       VALUES 
                       ('Toyota Corolla', 'SBA1234E', 30.00, 'toyota.jpeg', 'Automatic, 4-door, AC, Radio', 0),
                       ('Honda Civic', 'SBA4334E', 35.00, 'civic.jpeg', 'Manual, 4-door, AC, Radio', 0),
                       ('Ford Mustang', 'SBA1224E', 50.00, 'mustang.jpeg', 'Automatic, 2-door, AC, Radio, GPS', 0),
                       ('Chevrolet Malibu', 'SBA1235E', 40.00, 'chevrolet.jpeg', 'Automatic, 4-door, AC, Radio, Sunroof', 0),
                       ('Tesla Model 3', 'SBA1236E', 70.00, 'tesla.jpeg', 'Automatic, 4-door, AC, Radio, Electric', 0);''')

        cursor.execute('''INSERT INTO users (username, password, phone_number, email, is_deleted) VALUES 
                       ('admin', 'password123', '+65 8123 4567', 'admin@example.com', 0),
                       ('user1', 'mypassword', '+65 9234 5678', 'user1@example.com', 0),
                       ('user2', 'securepassword', '+65 6123 4567', 'user2@example.com', 0),
                       ('user3', 'user3password', '+65 6345 6789', 'user3@example.com', 0)''')
        print("Successful insert data")
        conn.commit()
    except sqlite3.Error as e:
        print("Setup Database Error: ", e)
    finally:
        conn.close

if __name__ == "__main__":
    create_database()