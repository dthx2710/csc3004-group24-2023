# Use Node.js base image
FROM node:bullseye

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the entire project directory to the working directory
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the port on which your application listens
EXPOSE 50053

# Run the application
CMD ["node", "result.js"]
