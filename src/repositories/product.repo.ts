import { QueryResult } from "pg";
import db from "../configs/connection";
import { IProducts, IBody } from "../models/product.model";

export const getProducts = (name?: string):Promise<QueryResult<IProducts>> => {
    let query = `SELECT * FROM products`;
    const values = [];
    if(name) {
        query += " WHERE product_name ILIKE $1";
        values.push(`%${name}%`);
    }
    return db.query(query, values);
};

export const getDetailProducts = (id: string):Promise<QueryResult<IProducts>> => {
  const query = `SELECT * FROM products WHERE id=$1`;
  const value = [id];
  return db.query(query,value);
};

export const addProducts = (body: IBody):Promise<QueryResult<IProducts>> => {
  const query = `INSERT INTO products (product_name, image, category, price, description) values ($1,$2,$3,$4,$5) returning *`;
  const {product_name, image, category, price, description} = body;
  const values = [product_name, image, category, price, description];
  return db.query(query, values);
};

export const updateProducts = (id:string, body: IBody):Promise<QueryResult<IProducts>> => {
  const query = `UPDATE products SET product_name=$1, image=$2, category=$3, price=$4, description=$5 WHERE id=$6 returning *`;
  const {product_name, image, category, price, description} = body;
  const values = [product_name, image, category, price, description, id];
  return db.query(query, values);
};

export const deleteProduts = (id: string):Promise<QueryResult<IProducts>> => {
  const query = `DELETE FROM products WHERE id=$1 returning *`;
  const value = [id];
  return db.query(query,value);
};