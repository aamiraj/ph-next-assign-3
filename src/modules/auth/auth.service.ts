import httpStatus from "http-status";
import APIError from "../../errors/APIError";
import { IUser } from "../User/user.interface";
import User from "../User/user.model";
import { ILogInUser } from "./auth.interface";
import getAccessToken from "../../jwt/getLogInToken";

const signUpUserToDB = async (payload: Partial<IUser>) => {
  await User.create(payload);

  const newUser = await User.findOne({ email: payload.email });

  return newUser;
};

const logInUserToDB = async (payload: ILogInUser) => {
  const user = await User.findOne({ email: payload?.email })
    .select("+password")
    .lean();

  // checking for user exist
  if (!user) {
    throw new APIError(
      `User does not exist with this ${payload?.email} email`,
      httpStatus.NOT_FOUND,
    );
  }

  const { password, ...userWithoutPass } = user;

  // we can also check for blocked or deleted user later
  // checking for passwor match
  const isPasswordMatched = await User.isPasswordMatched(
    payload?.password,
    password,
  );

  if (!isPasswordMatched) {
    throw new APIError("Password did not match.", httpStatus.FORBIDDEN);
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = getAccessToken(jwtPayload);

  return { userWithoutPass, accessToken };
};

export const AuthService = {
  signUpUserToDB,
  logInUserToDB,
};
