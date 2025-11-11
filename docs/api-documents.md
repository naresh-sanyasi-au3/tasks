# API Documentation

The **Tasks API** is a simple microservice that allows users to create, retrieve, update, and delete tasks.  
It follows RESTful design principles and supports task status tracking with validation and structured responses.


## Architectural Diagram

![alt text](diagram-arch.png)


 ## Endpoints**

 ### Base URL
**http://localhost:4000/tasks**

| Method | Endpoint | Description       |
|--------|-----------|------------------|
| `POST` | `/`       | Create new task  |
| `GET`  | `/`       | Get all tasks    |
| `PUT`  | `/:id`    | Update a task    |
| `DELETE` | `/:id`  | Delete a task    |


## Create Task
### POST /tasks 

Request Body

```json
{
  "name": "create a log",
  "description": "create a log for node js api",
  "status": "In Progress"
}
```

| **Field** | **Type** | **Required** | **Description** |
|------------|-----------|---------------|-----------------|
| `name` | string | Yes | Updated name |
| `description` | string | Yes | Updated details |
| `status` | string | No | Enum: `"Pending"`, `"In Progress"`, `"Completed"` <br>_Default_: `"Pending"` |


Response (201 Created)
```json
{
    "message": "Task Created Succesfully",
    "data": {
        "id": "6913229d559b9ca95f25ca9a",
        "name": "palying cricket",
        "description": "play cricket with team",
        "status": "Pending"
    }
}
```

 Error Response (400)
 ```json
{
  "message": "Name is required"
}
```

 ## Get All Tasks

### GET /tasks

 Response (200 OK)
 ```json
{
    "message": "Task Fetched Succesfully",
    "data": [
        {
           "id": "69129f349ad2d70cac089b89",
            "name": "palying cricket",
            "description": "play cricket with team",
            "status": "Pending"
        },
        {
            "id": "6912bb81a214c7e9c4e54fa9",
            "name": "palying football",
            "description": "play football at MG Garden",
            "status": "Pending"
        }
    ]
}
```

 ## Update Task

### PUT /tasks/:id 

Request
PUT /tasks/690ffe1cb258585cae1e89ab

 Request Body
 ```json
{
  "name": "make tea",
  "description": "Make tea without sugar",
  "status": "Completed"
}
```

| **Field** | **Type** | **Required** | **Description** |
|-----------|----------|--------------|-----------------|
| `name` | string | Yes | Updated name |
| `description` | string | Yes | Updated details |
| `status` | string | No | One of `"Pending"`, `"In Progress"`, `"Completed"` |


Response (200 OK)
```json
{
    "message": "Task Updated Succesfully",
    "data": {
        "id": "6913229d559b9ca95f25ca9a",
        "name": "palying tennis",
        "description": "play cricket with team",
        "status": "Completed"
    }
}
```

Error Response (404)
```json
{
  "message": "Task not found"
}
```
  ## Delete Task

### DELETE /tasks/:id

 Request
DELETE /tasks/690ffe1cb258585cae1e89ab

 Response (200 OK)
 ```json
{
  "message": "Task Deleted Successfully"
}
```

Error Response (404)
```json
{
  "message": "Task not found"
}
```

 ## Collections

 ### Task 

  - **name: String**
  - **description: String**


 ### Taskstatus 

  - **taskId: ObjectId, // taskid**
  - **status: String** ***enum: ["Pending", "In Progress", "Completed"]*** ***default: "Pending"***
   

 ## Validation Rules

| **Field** | **Rule** |
|------------|-----------|
| `id` (in URL) | Must be a valid MongoDB ObjectId |
| `name` | Required |
| `description` | Required |
| `status` | Optional, but must be one of `"Pending"`, `"In Progress"`, or `"Completed"` |

 
