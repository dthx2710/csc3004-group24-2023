# Use the official Golang image as the base image
FROM golang:1.20

# Set the working directory inside the container
WORKDIR /app

# Copy the Go project files to the container's working directory
COPY . .

EXPOSE 8080

# Download the dependencies
RUN go mod download

# Build the Go application
RUN go build -o gateway

# Build and run the Go application
CMD ["go", "run", "main.go"]