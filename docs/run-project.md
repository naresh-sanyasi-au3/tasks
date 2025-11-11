

##  Setup Instructions

1. **Clone the repository**
```bash
   git clone https://github.com/naresh-sanyasi-au3/ccep-technical-exercise.git
```
2. **project directory**

```bash
cd ccep-technical-exercise
```
3. **Install dependencies**

```bash
   npm install
```

4. **Create a .env file in the root directory and add below environment variables**
```js
PORT=4000
MONGO_URI=mongodburl
```

5. **Start the application**
```bash
npm start 
or
npm run dev
```


 

## To Run Test Cases
```bash
 npm run test
```


## The design choices you made

Routes → Controller → Service → Model → Database 
single responsiblity


## Summary of Design Choices

| **Component** | **Implementation** | **Notes** |
|----------------|--------------------|------------|
| **Architecture** | Layered / Modular | Clean separation, easier maintenance |
| **Database** | MongoDB | Flexible schema |
| **API Type** | RESTful | Follows standard HTTP methods for CRUD operations |
| **Validation** | express-validator | Ensures robust request validation |
| **Testing** | Jest + Supertest | Automated unit and integration testing |
| **Error Handling** | Centralized middleware | Consistent error output |
| **Future Scalability** | Microservice-ready | Easy horizontal scaling |


## How your service adheres to MACH principles

This service follows MACH principles by being modular (microservice-ready),
API-first with RESTful JSON APIs, cloud-native using Node.js and MongoDB 
(easy to deploy), and headless with no frontend. 
It’s simple, flexible, and designed for scalability, easy integration, and future expansion










