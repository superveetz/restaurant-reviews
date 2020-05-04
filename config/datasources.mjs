import mongoose from "mongoose";

const connectMongoDb = () => {
  return mongoose.connect("mongodb://localhost:27017/restaurant-reviews");
};

export { connectMongoDb };
