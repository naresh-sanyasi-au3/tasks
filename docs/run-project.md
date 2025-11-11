# to run project

1=> git clone https://github.com/naresh-sanyasi-au3/ccep-technical-exercise.git
3=> npm install
4=> create  .env file and add below environment variable
PORT=4000
MONGO_URI=mongodburl
5=> npm start /npm run dev

# to run test cases

1=> npm run test


# The design choices you made

Routes → Controller → Service → Model → Database 
single responsiblity


# Summary of Design Choices

Architecture ==>	Layered / Modular ==> Clean separation, easier maintenance
Database ==>	MongoDB	==> Flexible schema
API Type ==> RESTful	
Validation ==> express-validator
Testing	==> Jest + Supertest
Error Handling	==> Centralized middleware	Consistent error output
Future Scalability	==> Microservice-ready	==> Easy horizontal scaling


# How your service adheres to MACH principles

This service follows MACH principles by being modular (microservice-ready),
 API-first with RESTful JSON APIs, cloud-native using Node.js and MongoDB 
 (easy to deploy), and headless with no frontend. 
 It’s simple, flexible, and designed for scalability, easy integration, and future expansion










