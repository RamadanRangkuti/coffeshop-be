import { QueryResult } from "pg";
import db from "../configs/connection";
import { IBody, IUsers } from "../models/user.model";

export const registerUser = (body: IBody, hashedPassword: string): Promise<QueryResult<IUsers>> => {
  const query = `INSERT INTO users (fullname, username, email, password)
  values($1,$2,$3,$4) returning fullname, username, email`
  const { fullname, username, email } = body;
  const values = [fullname, username, email, hashedPassword];
  return db.query(query, values);
};

export const loginUser = (email: string): Promise<QueryResult<{ fullname: string, id: string, password: string }>> => {
  const query = `SELECT id, fullname, password from users WHERE email = $1`;
  const values = [email];
  return db.query(query, values);
}