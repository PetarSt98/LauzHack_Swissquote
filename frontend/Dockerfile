# Step 1: Node image as the base
FROM node:latest

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the frontend code
COPY . .

# Step 6: Expose the port the app runs on
EXPOSE 3000

# Step 7: Start the app
CMD ["npm", "start"]
