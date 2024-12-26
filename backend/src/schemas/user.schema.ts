import { Document } from "mongoose";

interface IUserSchema extends Document {
  name: string;
  email: string;
  password: string;
  token: string;
  createdAt: Date;
  validatePassword(password: string): Promise<boolean>;
  hashPasswordd(password: string): Promise<string>;
}

export default IUserSchema;