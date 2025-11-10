
import mongoose from  "mongoose"

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("database connected")
  } catch (err) {
    console.error("connection error:", err.message)
  }
};

export default connectDatabase;
