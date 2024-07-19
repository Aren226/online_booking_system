FROM python:3.9

WORKDIR /app

COPY requirements.txt .

RUN python -m venv venv && \
    . venv/bin/activate && \
    pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5001

CMD ["sh", "-c", ". venv/bin/activate && python setup_database.py && gunicorn --workers 4 --bind 0.0.0.0:5001 api:app"]
