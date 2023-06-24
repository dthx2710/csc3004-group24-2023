# CSC3004 Group 24 Project
## Distributed Voting System using Cloud Native Technology utilizing gRPC and Kafka
GitHub Repository can be found [here](https://github.com/dthx2710/csc3004-group24-2023), and Releases are found [here](https://github.com/dthx2710/csc3004-group24-2023/releases)
## Group24 Members
| Name                   | Student ID | Role                        | Github                                               |
| ---------------------- | ---------- | --------------------------- | ---------------------------------------------------- |
| **Dylan Tok**          | 2101372    | Backend Lead                | [@dthx2710](https://github.com/dthx2710)             |
| **Xu Xueli**           | 2101812    | Databases and Analytics     | [@xx-ue](https://github.com/xx-ue)                   |
| **Derick Kwok**        | 2100689    | Docker and Deployment       | [@zyferis](https://github.com/zyferis)               |
| **Zhang XiangHui**     | 2101993    | Backend and Testing         | [@XiangHui556](https://github.com/XiangHui556)       |
| **Yong Kai En**        | 2100658    | Frontend Lead               | [@kaiiennn](https://github.com/kaiiennn)             |
| **Samantha Lee**       | 2102066    | Frontend and Testing        | [@slqy](https://github.com/slqy)                     |

## Introduction
This project is a cloud-native solution that leverages gRPC and Kafka to create a scalable and decentralized voting platform.

This system addresses the need for efficient and reliable voting processes across multiple nodes.

In this prototype, users are able to log into the system as an user or a system admin to view the polls of their GRC (Group representation constituency) location. Users will also be able to vote on these polls. Admins will be able to view the results of these polls, and also create and delete them.

## Implementation
The system is designed as a microservices architecture, with distinct services for our business logic.

By utilizing gRPC, a high-performance RPC framework, the system ensures secure and seamless communication between client applications and voting servers, enabling users to cast their votes efficiently.

To enable real-time data streaming and event-driven architecture, the system incorporates Kafka, a distributed streaming platform. Kafka facilitates the smooth transmission of vote-related events across distributed nodes, enabling real-time updates and result aggregation.

Security and anonymity has been enhanced with the use of JSON Web Tokens (JWT) for authorization and authentication, hashing and salting for passwords and voters so identities cannot be tracked back.

Designed with cloud-native principles in mind, the Distributed Voting System can be effortlessly deployed and scaled on modern cloud platforms. With the help of containerization technologies like Docker and Kubernetes, deployment and management across various cloud environments become simplified. Additionally, our project is also [deployed on the cloud](http://35.187.251.126/) using Google Kubernetes Engine.

In summary, the Distributed Voting System combines cloud-native technologies, gRPC, and Kafka to provide a scalable and secure voting solution. It aims to deliver an efficient and transparent voting experience, ensuring the integrity of the entire voting process in real time.

## Requirements
- A machine running Windows or Linux operating system
- Docker
- NodeJS and Go if you want to run the services manually (optional)

## Directory
- `./frontend` - Contains the frontend code for the web application
- `./gateway` - Contains the gRPC gateway code
- `./user-service` - Contains the user-service code
- `./poll-service` - Contains the poll-service code
- `./result-service` - Contains the result-service code
- `./vote-service` - Contains the vote producer and consumer
- `./nginx` - Contains the nginx configuration file
- `./kubernetes` - Contains the kubernetes configuration files
- `./docker-compose.yml` - Contains the docker-compose configuration for the services

## Quickstart Steps
1. Clone the repository or download release from [here](https://github.com/dthx2710/csc3004-group24-2023/releases)
2. Configure the environment variables in the `.env` file:
   - You can use the `.env.sample` file as a template (copy and rename as `.env`)
   - !IMPORTANT! Add Database Credentials to the `.env` file, based on the details provided in the submission email/pdf:
     - `DATABASE_URL={provided string}`
3. Start Docker
4. Build the container (optional)
   `npm run build`
5. Run the container
   `npm run up`
6. With this, the Docker-Compose Stack will be up and running
   - The frontend will be available at `localhost` or wherever you are hosting/deploying this on (HTTP - port 80)
   - The gateway will be available at `localhost:8080`, and acts as a internal proxy for the other api services on ports (e.g. `50051`-`50054`)
   - We have an NGINX reverse proxy running on port `80` to route the traffic to the frontend and gateway

## Software Architecture and Diagrams
<p align="center">
   <img src="https://github.com/dthx2710/csc3004-group24-2023/assets/37941268/09c10cdd-b4cf-499c-af32-bd081c94bcee" alt="System Architecture" />
   <img src="https://github.com/dthx2710/csc3004-group24-2023/assets/37941268/d8d2bdb4-2786-4ab4-b157-e77dd5062ef6" alt="gRPC Flow" />
   <img src="https://github.com/dthx2710/csc3004-group24-2023/assets/37941268/db38ca8f-95ac-49b8-b9ea-f5b214934c02" alt="JWT Exchange" />
   <img src="https://github.com/dthx2710/csc3004-group24-2023/assets/37941268/18ccde7d-ed0c-4d59-8f82-35edc46affc7" alt="Kafka" />
</p>

## Application & Other Screenshots
<p align="center">
   <img src="https://github.com/dthx2710/csc3004-group24-2023/assets/37941268/2bcb083c-2c16-4801-9dd3-81263055cd80" alt="Login Page" />
   <img src="https://github.com/dthx2710/csc3004-group24-2023/assets/37941268/1e3fce53-6c7e-4311-afd6-4987f7c0073d" alt="User Polls" />
   <img src="https://github.com/dthx2710/csc3004-group24-2023/assets/37941268/02b43043-09f7-4df5-b667-89e7a9413260" alt="Vote" />
   <img src="https://github.com/dthx2710/csc3004-group24-2023/assets/37941268/01b3da2f-1c9d-4c99-9dd6-4555dee94047" alt="Admin Polls" />
   <img src="https://github.com/dthx2710/csc3004-group24-2023/assets/37941268/c3dd319d-fc53-448a-95a6-9656e9c78969" alt="Results" />
   <img src="https://github.com/dthx2710/csc3004-group24-2023/assets/37941268/2d5a5ac6-5273-4af0-8e2a-f1a2126df153" alt="Kubernetes Services" />
   <img src="https://github.com/dthx2710/csc3004-group24-2023/assets/37941268/ca091e9d-3500-4fad-bb76-4c0d2011bd4a" alt="Load Testing Utilization" />
</p>

## Developer Additions
## Generating Protobuf files
The protobuf files are already generated, but if you want to generate them yourself, you can do so by following the steps below:
1. Install protoc, protoc-gen-go, protoc-gen-grpc-web, make
2. Find the proto files in the `proto` directory
4. You can simply run `make protoc-all` to generate the gateway files
5. Or alternatively, copy the commands in Makefile to run them individually if you prefer
This will generate the Protobuf files for gRPC communications

## Running the services manually
We recommend using Docker to run the services instead, but if you want to run the services manually (NOT recommended), you can do so by following the steps below:
1. Install NodeJS, go
2. Configure environment files for each folder
3. Start frontend, gateway, user, poll, result, voteproducer/consumer + kafka/zookeeper compose container services in separate terminals
