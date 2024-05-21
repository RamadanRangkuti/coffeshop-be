import { QueryResult } from "pg";
import db from "../configs/connection";
import { IPromo, IBody } from "../models/promo.model";

export const getPromo = (promo_name?: string):Promise<QueryResult<IPromo>> => {
  let query = `SELECT * FROM promo`;
  const values = [];
  if(promo_name) {
      query += " WHERE promo_name ILIKE $1";
      values.push(`%${promo_name}%`);
  }
  return db.query(query, values);
};

export const getDetailPromo = (id: string):Promise<QueryResult<IPromo>> => {
  const query = `SELECT * FROM promo WHERE id=$1`;
  const value = [id];
  return db.query(query,value);
};

export const addPromo = (body: IBody):Promise<QueryResult<IPromo>> => {
  const query = `INSERT INTO promo (product_id, promo_name, promo_code, discount, image, description) values ($1,$2,$3,$4,$5,$6) returning *`;
  const {product_id, promo_name, promo_code, discount, image, description} = body;
  const values = [product_id, promo_name, promo_code, discount, image, description];
  return db.query(query, values);
};

export const updatePromo = (id:string, body: IBody):Promise<QueryResult<IPromo>> => {
  const query = `UPDATE promo SET product_id=$1, promo_name=$2, promo_code=$3, password=$4, image=$5, description=$6 returning *`;
  const {product_id, promo_name, promo_code, discount, image, description} = body;
  const values = [product_id, promo_name, promo_code, discount, image, description, id];
  return db.query(query, values);
};

export const deletePromo = (id: string):Promise<QueryResult<IPromo>> => {
  const query = `DELETE FROM promo WHERE id=$1 returning *`;
  const value = [id];
  return db.query(query,value);
};