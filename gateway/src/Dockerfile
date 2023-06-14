# Use the official Golang image as the base image
FROM golang:bullseye

# Set the working directory inside the container
WORKDIR /app

# Copy the Go project files to the container's working directory
COPY . .

EXPOSE 8080

# Download the dependencies
RUN go mod download

# Build the Go application
RUN go build -o gateway

# Set the command to run when the container starts
CMD ["./gateway"]