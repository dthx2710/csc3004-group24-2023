## Installation via Docker
- Ensure DOCKER service is running
- Open terminal
- Run 
```
docker build -t user-service .
```
- Run 
```
docker run -d -p 50051:50051 --name user-service_docker user-service
```
- Run to ensure that service ```user-service_docker``` is running
```
docker ps
```
- Run app by visiting 
```
http://localhost:50051
```
