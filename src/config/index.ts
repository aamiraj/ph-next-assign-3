import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const EnvConfig = {
  environment: process.env.ENVIRONMENT as string,
  port: process.env.PORT as string,
  mongodbUri: process.env.MONGODB_URI as string,
};
