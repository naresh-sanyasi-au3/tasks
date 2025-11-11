
import mongoose from  "mongoose"

// Function to connect to MongoDB
const connectDatabase = async () => {
  try {
    // Connect using the MONGO_URI from environment variables
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully");
  } catch (err) {
    // Log any connection errors
    console.error("Database connection error:", err);
  }
};

export default connectDatabase;

