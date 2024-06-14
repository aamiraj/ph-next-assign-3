import { Model } from "mongoose";
import { Roles } from "./user.constant";

export type TRole = (typeof Roles)[number];

export interface IUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: TRole;
  address: string;
}

export interface IUserModel extends Model<IUser> {
  isPasswordMatched(plainPass: string, hashPass: string): Promise<boolean>;
}
