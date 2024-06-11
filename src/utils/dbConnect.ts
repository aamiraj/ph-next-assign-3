import mongoose from "mongoose";
import { EnvConfig } from "../config";

export default async function dbConnect() {
  try {
    await mongoose.connect(EnvConfig.mongodbUri as string).then(
      () => {
        console.log("Successfully connected to database.");
      },
      (error) => {
        console.log(
          "Error occured while connecting, message: ",
          error?.message,
        );
      },
    );

    mongoose.connection.on("disconnected", () =>
      console.log("Database disconnected."),
    );
  } catch (error) {
    console.log("Database connection failed.");
  }
}
