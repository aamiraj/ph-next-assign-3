import { Roles } from "./user.constant";

type TRole = (typeof Roles)[number];

export interface IUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: TRole;
  address: string;
}
