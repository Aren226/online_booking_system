class Booking:
    def __init__(self, id, booking_no, customer_name, customer_phone, customer_email, car_id, rental_rate, start_date, end_date, is_deleted) -> None:
        self.id = id
        self.booking_no = booking_no
        self.customer_name = customer_name
        self.customer_phone = customer_phone
        self.customer_email = customer_email
        self.car_id = car_id
        self.rental_rate = rental_rate
        self.start_date = start_date
        self.end_date = end_date
        self.is_deleted = is_deleted

    