from setup_database import create_connection
import sqlite3
import uuid


class Booking:
    def __init__(self, id=None, booking_no=None, user_id=None, customer_name=None, customer_phone=None, customer_email=None, car_id=None, rental_rate=None, start_date=None, end_date=None, is_deleted=None) -> None:
        self.id = id
        self.booking_no = booking_no
        self.user_id = user_id
        self.customer_name = customer_name
        self.customer_phone = customer_phone
        self.customer_email = customer_email
        self.car_id = car_id
        self.rental_rate = rental_rate
        self.start_date = start_date
        self.end_date = end_date
        self.is_deleted = is_deleted

    @staticmethod
    def insert_booking(data):
        try:
            conn = create_connection()
            cursor = conn.cursor()
            cursor.execute('''INSERT INTO bookings (booking_no, user_id, customer_name, customer_phone, customer_email, car_id, rental_rate, start_date, end_date, is_deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)''',
                           (data.booking_no, data.user_id, data.customer_name, data.customer_phone, data.customer_email, data.car_id, data.rental_rate, data.start_date, data.end_date,))
            conn.commit()
            return True
        except sqlite3.Error as e:
            print("Insert Booking Error: ", e)
        finally:
            if conn:
                conn.close()

    def generate_booking_id():
        return str(uuid.uuid4())
