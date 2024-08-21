import mongoose from "mongoose";

let isConnected = false; // Track the connection status

export const connectToDB = async () => {
  mongoose.set("strictQuery", true); // Ensures strict mode for queries

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true, // Use the new URL parser for MongoDB
      useUnifiedTopology: true, // Use the new topology engine
    });

    isConnected = true; // Set the connection status to true after successful connection

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error); // Log the error with more context
    throw new Error("Failed to connect to MongoDB");
  }
};
