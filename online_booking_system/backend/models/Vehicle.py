import sqlite3
from setup_database import create_connection

class Vehicle:
    def __init__(self, id, model, price_per_day, image_url, specification, is_reserved, is_deleted) -> None:
        self.id = id
        self.model = model
        self.price_per_day = price_per_day
        self.image_url = image_url
        self.specification = specification
        self.is_reserved = is_reserved
        self.is_deleted = is_deleted

    @staticmethod
    def get_all_vehicle():
        try:
            conn = create_connection()
            cursor = conn.cursor()
            cursor.execute('''SELECT * FROM vehicles WHERE is_reserved = 0 AND is_deleted = 0''')
            rows = cursor.fetchall()
            return [Vehicle(*row) for row in rows]
        except sqlite3.Error as e:
            print("Get all vehicle error: ", e)
        finally:
            if conn:
                conn.close()

    @staticmethod
    def get_vehicle_by_id(vehicle_id):
        try:
            conn = create_connection()
            cursor = conn.cursor()
            cursor.execute('''SELECT * FROM vehicles WHERE id = ? AND is_reserved = 0 AND is_deleted = 0''', (vehicle_id,))
            rows = cursor.fetchall()
            return [Vehicle(*row) for row in rows]
        except sqlite3.Error as e:
            print("Get vehicle by id error: ", e)
        finally:
            if conn:
                conn.close()

    def to_dict(self):
        return {
            "id": self.id,
            "model": self.model,
            "price_per_day": self.price_per_day,
            "image_url": self.image_url,
            "specification": self.specification,
            "is_reserved": self.is_reserved,
            "is_deleted": self.is_deleted,
        }
