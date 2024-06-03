import { QueryResult } from "pg";
import db from "../configs/connection";
import { IPromo, IBody } from "../models/promo.model";

export const getPromo = (promo_name?: string): Promise<QueryResult<IPromo>> => {
  let query = `SELECT * FROM promo`;
  const values = [];
  if (promo_name) {
    query += " WHERE promo_name ILIKE $1";
    values.push(`%${promo_name}%`);
  }
  return db.query(query, values);
};

export const getDetailPromo = (id: string): Promise<QueryResult<IPromo>> => {
  const query = `SELECT * FROM promo WHERE id=$1`;
  const value = [id];
  return db.query(query, value);
};

export const addPromo = (body: IBody): Promise<QueryResult<IPromo>> => {
  const query = `INSERT INTO promo (product_id, promo_name, promo_code, discount, image, description) values ($1,$2,$3,$4,$5,$6) returning *`;
  const { product_id, promo_name, promo_code, discount, image, description } = body;
  const values = [product_id, promo_name, promo_code, discount, image, description];
  return db.query(query, values);
};

export const updatePromo = (id: string, body: IBody): Promise<QueryResult<IPromo>> => {
  let query = `UPDATE promo SET `;
  let fields: string[] = [];
  let values: (string | number | null)[] = [];

  const { product_id, promo_name, promo_code, discount, image, description } = body;

  if (product_id) {
    fields.push(`product_id = $${fields.length + 1}`);
    values.push(product_id);
  }

  if (promo_name) {
    fields.push(`promo_name = $${fields.length + 1}`);
    values.push(promo_name);
  }

  if (promo_code) {
    fields.push(`promo_code = $${fields.length + 1}`);
    values.push(promo_code);
  }

  if (discount) {
    fields.push(`discount = $${fields.length + 1}`);
    values.push(discount);
  }

  if (image) {
    fields.push(`image = $${fields.length + 1}`);
    values.push(image);
  }

  if (description) {
    fields.push(`description = $${fields.length + 1}`);
    values.push(description);
  }

  fields.push(`updated_at = now()`);

  query += fields.join(', ');

  const idNumber = values.length + 1;
  query += ` WHERE id = $${idNumber} returning *`;
  values.push(id);

  // console.log('Query:', query);
  // console.log('Values:', values);

  return db.query(query, values);
};

export const deletePromo = (id: string): Promise<QueryResult<IPromo>> => {
  const query = `DELETE FROM promo WHERE id=$1 returning *`;
  const value = [id];
  return db.query(query, value);
};