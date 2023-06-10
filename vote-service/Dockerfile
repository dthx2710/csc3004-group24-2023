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
ENV VOTE_SERVICE_URL=localhost:50054
# Expose the port on which your application listens
EXPOSE 50054

# Run the npm start command
CMD ["npm", "start"]