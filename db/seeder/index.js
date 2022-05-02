import connectDB from "../connect.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import seedBucketListItem from "./bucketListItem.seeder.js";
dotenv.config();
const db = process.env.MONGO_URI;

const seed = () => {
  // Connect to MongoDB via Mongoose
  connectDB(db);
  const connection = mongoose.connection;
  connection.on("error", console.error.bind(console, "connection error:"));
  connection.once("open", () => {
    console.log("Connected to MongoDB");
    populate();
    // Close the Mongoose connection
    setTimeout(() => {
      mongoose.disconnect();
      console.log("Disconnected from MongoDB");
    }, 3000);
  });
};

const populate = async () => {
  //check if the env is not production
  if (process.env.NODE_ENV !== "production") {
    console.log("dropping collections and sending seed");

    seedBucketListItem();
    // here to include different modal operations
  }
};

seed();
