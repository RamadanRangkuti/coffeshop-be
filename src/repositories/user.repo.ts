import { QueryResult } from "pg";
import db from "../configs/connection";
import { IUsers, IBody } from "../models/user.model";

export const getUsers = (name?: string, page?: number,
  limit?: number):Promise<QueryResult<IUsers>> => {
  let query = `SELECT * FROM users`;
  const values = [];
  if(name) {
      query += " WHERE username ILIKE $1";
      values.push(`%${name}%`);
  }
  if (page !== undefined && limit !== undefined) {
    const offset = (page * limit - limit);
    query += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
    values.push(limit, offset);
  }
  return db.query(query, values);
};

export const getDetailUsers = (id: string):Promise<QueryResult<IUsers>> => {
  const query = `SELECT * FROM users WHERE id=$1`;
  const value = [id];
  return db.query(query,value);
};

export const addUsers = (body: IBody):Promise<QueryResult<IUsers>> => {
  const query = `INSERT INTO users (fullname, username, email, password, image, phone, address, bank_account, card) values ($1,$2,$3,$4,$5,$6,$7,$8,$9) returning *`;
  const {fullname, username, email, password, image, phone, address, bank_account, card} = body;
  const values = [fullname, username, email, password, image, phone, address, bank_account, card];
  return db.query(query, values);
};

export const updateUsers = (id:string, body: IBody):Promise<QueryResult<IUsers>> => {
  const query = `UPDATE users SET fullname=$1, username=$2, email=$3, password=$4, image=$5, phone=$6, address=$7, bank_account=$8, card=$9, updated_at=now() WHERE id=$6 returning *`;
  const {fullname, username, email, password, image, phone, address, bank_account, card} = body;
  const values = [fullname, username, email, password, image, phone, address, bank_account, card, id];
  return db.query(query, values);
};

export const deleteUsers = (id: string):Promise<QueryResult<IUsers>> => {
  const query = `DELETE FROM users WHERE id=$1 returning *`;
  const value = [id];
  return db.query(query,value);
};