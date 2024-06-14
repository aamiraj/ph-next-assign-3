import { TRole } from "../modules/User/user.interface";

export interface JWTPayload {
  email: string;
  role: TRole;
}
