
import dotenv from "dotenv";
import connectDatabase from "./config/db.js";
import app from "./app.js";

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDatabase();

// Set port from environment or default to 4000
const PORT = process.env.PORT || 4000;

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

