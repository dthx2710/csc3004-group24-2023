# Use a Node.js base image
FROM node:bullseye

# Set the working directory inside the container
WORKDIR /app

ENV NODE_ENV=production

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project directory to the working directory
COPY . .
ENV USER_SERVICE_URL=localhost:50051
ENV DATABASE_URL=mysql://nezu80du7c7kd9j1y8q6:pscale_pw_Ba5mE3SjXYIK80b4FUcknF0LAGPBEeQ7OiglYJADYhX@aws.connect.psdb.cloud/voting-system?sslaccept=strict

# Expose the port on which your application listens
EXPOSE 50051

# Run the npm start command
CMD ["npm", "start"]