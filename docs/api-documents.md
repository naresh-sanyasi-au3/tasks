# API Documentation


# Architectural Diagram

![alt text](diagram-arch.png)

# Base URL
**http://localhost:4000/tasks**

 **Endpoints**
Method || Endpoint || Description
POST || "/" || create new task
GET || "/" || get all task
PUT || "/:id" || update a task
DELETE || "/:id" || delete a task

1. # Create Task

**POST /tasks**

Request Body
{
  "name": "create a log",
  "description": "create a log for node js api",
  "status": "In Progress"
}

Field || Type || Required || Description
name  || string || yes || Updated name
description || string || yes || Updated details
status || string || no || Enum: "Pending", "In Progress", "Completed" // default: "Pending"

Response (201 Created)
{
  "id": "690ffe1cb258585cae1e89ab",
  "name": "Design Homepage",
  "description": "Create UI mockup for homepage",
  "status": "In Progress",
}

 Error Response (400)
{
  "message": "Name is required"
}

2. # Get All Tasks

**GET /tasks**

 Response (200 OK)
[
  {
    "id": "690ffe1cb258585cae1e89ab",
    "name": "Design Homepage",
    "description": "Create UI mockup for homepage",
    "status": "In Progress"
  },
  {
    "id": "673a45fbc21fa91f23859a15",
    "name": "Backend API",
    "description": "Develop REST APIs for tasks",
    "status": "Pending"
  }
]

3. # Update Task

**PUT /tasks/:id**

Request
PUT /tasks/690ffe1cb258585cae1e89ab

 Request Body
{
  "name": "make tea",
  "description": "Make tea without sugar",
  "status": "Completed"
}

Field || Type || Required || Description
name  || string || yes || Updated name
description || string || yes || Updated details
status || string || no || "Pending", "In Progress", "Completed"

Response (200 OK)
{
  "id": "690ffe1cb258585cae1e89ab",
  "name": ""make a coffee,
  "description": "make a coffee without sugar",
  "status": "Completed",
}

Error Response (404)
{
  "message": "Task not found"
}

 4. # Delete Task

**DELETE /tasks/:id**

 Request
DELETE /tasks/690ffe1cb258585cae1e89ab

 Response (200 OK)
{
  "message": "Task Deleted Successfully"
}

Error Response (404)
{
  "message": "Task not found"
}

 # Models
 **Task Model**
{
  name: String,
  description: String,
}

 **TaskStatus Model**
{
  taskId: ObjectId, // taskid
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending"
  }
}

 # Validation Rules
Field	|| Rule
name	|| Required
description	|| Required
status	|| Optional but must be one of "Pending", "In Progress", "Completed"
id (in URL) || Must be valid MongoDB ObjectId
