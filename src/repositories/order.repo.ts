import { QueryResult } from "pg";
import db from "../configs/connection";
import { IOrder, IBody } from "../models/order.model";

export const getOrder = (order_number?: string, page?: number,
  limit?: number):Promise<QueryResult<IOrder>> => {
  let query = `SELECT * FROM orders`;
  const values = [];
  if(order_number) {
      query += " WHERE order_number ILIKE $1";
      values.push(`%${order_number}%`);
  }
  if (page !== undefined && limit !== undefined) {
    const offset = (page * limit - limit);
    query += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
    values.push(limit, offset);
  }
  return db.query(query, values);
};

export const getDetailOrder = (id: string):Promise<QueryResult<IOrder>> => {
  const query = `SELECT * FROM orders WHERE id=$1`;
  const value = [id];
  return db.query(query,value);
};

export const addOrder = (body: IBody):Promise<QueryResult<IOrder>> => {
  const query = `INSERT INTO orders (order_number, user_id, product_id, size, qty, sub_total, image, delivery, status, payment_method) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) returning *`;
  const {order_number, user_id, product_id, size, qty, sub_total, image, delivery, status, payment_method} = body;
  const values = [order_number, user_id, product_id, size, qty, sub_total, image, delivery, status, payment_method];
  return db.query(query, values);
};

export const updateOrder = (id:string, body: IBody):Promise<QueryResult<IOrder>> => {
  const query = `UPDATE orders SET order_number=$1, user_id=$2, product_id=$3, size=$4, sub_total=$5, image=$6, delivery=$7, status=$8, payment_method=$9, updated_at=now() WHERE id=$6 returning *`;
  const {order_number, user_id, product_id, size, qty, sub_total, image, delivery, status, payment_method} = body;
  const values = [order_number, user_id, product_id, size, qty, sub_total, image, delivery, status, payment_method, id];
  return db.query(query, values);
};

export const deleteOrder = (id: string):Promise<QueryResult<IOrder>> => {
  const query = `DELETE FROM orders WHERE id=$1 returning *`;
  const value = [id];
  return db.query(query,value);
};

