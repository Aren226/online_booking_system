import sqlite3
from setup_database import create_connection


class Vehicle:
    def __init__(self, id=None, model=None, plat_number=None, price_per_day=None, image_url=None, specifications=None, is_deleted=None) -> None:
        self.id = id
        self.model = model
        self.plat_number = plat_number
        self.price_per_day = price_per_day
        self.image_url = image_url
        self.specifications = specifications
        self.is_deleted = is_deleted

    @staticmethod
    def get_all_vehicle():
        try:
            conn = create_connection()
            cursor = conn.cursor()
            cursor.execute('''SELECT * FROM vehicles WHERE is_deleted = 0''')
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
            cursor.execute(
                '''SELECT * FROM vehicles WHERE id = ? AND is_deleted = 0''', (vehicle_id,))
            rows = cursor.fetchone()
            return Vehicle(*rows).to_dict()
        except sqlite3.Error as e:
            print("Get vehicle by id error: ", e)
        finally:
            if conn:
                conn.close()

    @staticmethod
    def insert_vehicle(data):
        try:
            conn = create_connection()
            cursor = conn.cursor()
            cursor.execute('''INSERT INTO vehicles (model, plat_number, price_per_day, image_url, specifications, is_deleted) VALUES (?, ?, ?, ?, ?, 0)''',
                           (data.model, data.plat_number, data.price_per_day, data.image_url, data.specifications,))
            conn.commit()
            return True
        except sqlite3.Error as e:
            print("Insert vehicle error: ", e)
        finally:
            if conn:
                conn.close()

    @staticmethod
    def update_vehicle_by_id(data):
        try:
            conn = create_connection()
            cursor = conn.cursor()
            cursor.execute('''UPDATE vehicles SET model = ?, plat_number = ?, price_per_day = ?, image_url = ?, specifications = ? WHERE id = ?''',(data.model,data.plat_number,data.price_per_day,data.image_url,data.specifications,data.id,))
            conn.commit()
            return True
        except sqlite3.Error as e:
            print("Delete vehicle error: ", e)
        finally:
            if conn:
                conn.close()

    @staticmethod
    def delete_vehicle_by_id(id):
        try:
            conn = create_connection()
            cursor = conn.cursor()
            cursor.execute('''UPDATE vehicles SET is_deleted = 1 WHERE id = ?''',(id,))
            conn.commit()
            return True
        except sqlite3.Error as e:
            print("Delete vehicle error: ", e)
        finally:
            if conn:
                conn.close()

    def to_dict(self):
        return {
            "id": self.id,
            "model": self.model,
            "plat_number": self.plat_number,
            "price_per_day": self.price_per_day,
            "image_url": self.image_url,
            "specifications": self.specifications,
        }
