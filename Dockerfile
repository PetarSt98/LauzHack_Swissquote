# Step 1: Python image as the base
FROM python:3.9-slim

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the requirements.txt file into the container
COPY requirements.txt .

# Step 4: Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Step 5: Copy the rest of your application's code into the container
COPY . .

# Step 6: Expose the port your app runs on
EXPOSE 5000

# Step 7: Set the default command for the container
CMD ["python", "main.py"]
