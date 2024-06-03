import { QueryResult } from "pg";
import db from "../configs/connection";
import { IUsers, IBody } from "../models/user.model";

export const getUsers = (name?: string, page?: number,
  limit?: number): Promise<QueryResult<IUsers>> => {
  let query = `SELECT id, fullname, username, email, image, phone, address, bank_account, card, created_at, updated_at FROM users`;
  const values = [];
  if (name) {
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

export const getDetailUsers = (id: string): Promise<QueryResult<IUsers>> => {
  const query = `SELECT id, fullname, username, email, image, phone, address, bank_account, card, created_at, updated_at FROM users WHERE id=$1`;
  const value = [id];
  return db.query(query, value);
};

export const addUsers = (body: IBody): Promise<QueryResult<IUsers>> => {
  const query = `INSERT INTO users (fullname, username, email, password, image, phone, address, bank_account, card) values ($1,$2,$3,$4,$5,$6,$7,$8,$9) returning *`;
  const { fullname, username, email, password, image, phone, address, bank_account, card } = body;
  const values = [fullname, username, email, password, image, phone, address, bank_account, card];
  return db.query(query, values);
};


export const updateUsers = (id: string, body: IBody, hashedPassword: string): Promise<QueryResult<IUsers>> => {
  let query = `UPDATE users SET `;
  let fields: string[] = [];
  let values: (string | number | null)[] = [];

  const { fullname, username, email, image, phone, address, bank_account, card } = body;

  if (fullname) {
    fields.push(`fullname = $${fields.length + 1}`);
    values.push(fullname);
  }

  if (username) {
    fields.push(`username = $${fields.length + 1}`);
    values.push(username);
  }

  if (email) {
    fields.push(`email = $${fields.length + 1}`);
    values.push(email);
  }

  if (hashedPassword) {
    fields.push(`password = $${fields.length + 1}`);
    values.push(hashedPassword);
  }

  if (image) {
    fields.push(`image = $${fields.length + 1}`);
    values.push(image);
  }

  if (phone) {
    fields.push(`phone = $${fields.length + 1}`);
    values.push(phone);
  }

  if (address) {
    fields.push(`address = $${fields.length + 1}`);
    values.push(address);
  }

  if (bank_account) {
    fields.push(`bank_account = $${fields.length + 1}`);
    values.push(bank_account);
  }

  if (card) {
    fields.push(`card = $${fields.length + 1}`);
    values.push(card);
  }

  fields.push(`updated_at = now()`);

  query += fields.join(', ');

  const idNumber = values.length + 1;
  query += ` WHERE id = $${idNumber} returning *`;
  values.push(id);

  return db.query(query, values);
};

export const deleteUsers = (id: string): Promise<QueryResult<IUsers>> => {
  const query = `DELETE FROM users WHERE id=$1 returning *`;
  const value = [id];
  return db.query(query, value);
};