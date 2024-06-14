import { EnvConfig } from "../config";
import { JWTPayload } from "../interfaces/JWTPayload";
import jwt from "jsonwebtoken";

const getAccessToken = (payload: JWTPayload) => {
  const token = jwt.sign(payload, EnvConfig.secretSign, {
    expiresIn: "1d",
  });
  return token;
};

export default getAccessToken;
