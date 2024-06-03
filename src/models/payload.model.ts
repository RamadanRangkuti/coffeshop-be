import { JwtPayload } from "jsonwebtoken";
export interface IPayload extends JwtPayload {
  id?: string;
  fullname?: string;
  // role?: number | undefined,
}