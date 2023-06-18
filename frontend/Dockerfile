# Use an official Node.js image as the base
FROM node:alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Create a new stage with a lightweight Node.js image
FROM node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy the built artifacts from the previous stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

# Install serve to serve the static files
RUN npm install -g serve

# Expose the container port
EXPOSE 80

# Set the command to run when the container starts
CMD ["npm", "run", "start"]
