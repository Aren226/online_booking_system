from setup_database import create_connection
import sqlite3

class User:
    def __init__(self, id, username, password, phone_number, email, is_deleted) -> None:
        self.id = id
        self.username = username
        self.password = password
        self.phone_number = phone_number
        self.email = email
        self.is_deleted = is_deleted

    @staticmethod
    def get_user_by_email_and_password(email, password):
        try:
            conn = create_connection()
            cursor = conn.cursor()
            cursor.execute('''SELECT * FROM users WHERE email = ? AND password = ? AND is_deleted = 0''', (email, password,))
            rows = cursor.fetchone()
            if rows:
                return User(*rows).to_dict()
            else:
                return {"id":"False"}
        except sqlite3.Error as e:
            print("Get all vehicle error: ", e)
        finally:
            if conn:
                conn.close()

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "phone_number": self.phone_number,            
        }
