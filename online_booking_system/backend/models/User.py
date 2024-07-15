class User:
    def __init__(self, id, username, password, phone_number, email, is_deleted) -> None:
        self.id = id
        self.username = username
        self.password = password
        self.phone_number = phone_number
        self.email = email
        self.is_deleted = is_deleted
