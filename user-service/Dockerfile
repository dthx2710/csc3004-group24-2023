# Use a Node.js base image
FROM node:bullseye

# Set the working directory inside the container
WORKDIR /app

ENV NODE_ENV=production

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npx prisma generate 

# Copy the entire project directory to the working directory
COPY . .

# Expose the port on which your application listens
EXPOSE 50051

# Run the npm start command
CMD bash -c 'npx prisma generate && npm start'
