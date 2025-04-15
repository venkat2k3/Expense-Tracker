# Use the official Node.js image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the frontend source code into the container
COPY . .

# Expose the port the frontend app will run on
EXPOSE 3000

# Run the frontend app
CMD ["npm", "start"]
