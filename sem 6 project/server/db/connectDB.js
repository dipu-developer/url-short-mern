import mongoose from "mongoose";

const connectDB = (DATABASE_URL) => {
  try {
    const OPTION = {
      dbName: process.env.DB_NAME,
    };
    const connect = mongoose.connect(DATABASE_URL, OPTION);
    if (connect) {
      console.log("Database connected Sucessfully");
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
