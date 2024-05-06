# Use an official Python runtime as the base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Install required system packages for MySQL connector
RUN apt-get update \
  && apt-get upgrade -y \
  && apt-get install -y gcc default-libmysqlclient-dev pkg-config \
  && rm -rf /var/lib/apt/lists/*

# Copy the requirements.txt file
COPY requirements.txt .

# Install app dependencies (including Flask-MySQLdb)
RUN pip install mysqlclient
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY . .

# Specify the command to run your application
CMD ["python", "app.py"]
