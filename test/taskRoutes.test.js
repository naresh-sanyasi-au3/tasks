import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app.js";
import Task from "../models/task.js";
import TaskStatus from "../models/taskStatus.js";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Task.deleteMany();
  await TaskStatus.deleteMany();
});

describe("Task API", () => {
  it("should create a new task)", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ name: "New Task", description: "Test desc", status: "Pending" });

    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data.name).toBe("New Task");
    expect(res.body.data.status).toBe("Pending");
  });

  it("should get all tasks", async () => {
    await request(app).post("/tasks").send({
      name: "Task 1",
      description: "Task 1 desc",
      status: "Pending",
    });

    const res = await request(app).get("/tasks");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(1);
  });

  it("should update a task", async () => {
    const created = await request(app)
      .post("/tasks")
      .send({ name: "Old Task", description: "Before update" });

    const res = await request(app).put(`/tasks/${created.body.data.id}`).send({
      name: "Updated Task",
      description: "After update",
      status: "Completed",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe("Updated Task");
    expect(res.body.data.description).toBe("After update");
    expect(res.body.data.status).toBe("Completed");
  });

  it("should delete a task", async () => {
    const created = await request(app)
      .post("/tasks")
      .send({ name: "Task to delete", description: "Delete desc" });
    const res = await request(app).delete(`/tasks/${created.body.data.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Task Deleted Successfully");
  });
});
