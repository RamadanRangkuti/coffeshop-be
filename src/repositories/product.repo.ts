import { QueryResult } from "pg";
import db from "../configs/connection";
import { IProducts, IBody } from "../models/product.model";

export const getProducts = ( name?: string,
  category?: string,
  minPrice?: number,
  maxPrice?: number,
  sortBy?: string,
  sortOrder?: string,
  promo?: boolean,
  page?: number,
  limit?: number):Promise<QueryResult<IProducts>> => {
    let query = `SELECT * FROM products`;
    const values = [];
    if (name) {
      query += ` WHERE product_name ILIKE $${values.length + 1}`;
      values.push(`%${name}%`);
    }
  
    if (category) {
      if (query.includes('WHERE')) {
        query += ` AND category ILIKE $${values.length + 1}`;
      } else {
        query += ` WHERE category ILIKE $${values.length + 1}`;
      }
      values.push(`%${category}%`);
    }

    if(promo){
      query += ` JOIN promo pr ON products.id = pr.product_id`
    }
  
    if (minPrice !== undefined) {
      if (query.includes('WHERE')) {
        query += ` AND price >= $${values.length + 1}`;
      } else {
        query += ` WHERE price >= $${values.length + 1}`;
      }
      values.push(minPrice);
    }
    
    if (maxPrice !== undefined) {
      if (query.includes('WHERE')) {
        query += ` AND price <= $${values.length + 1}`;
      } else {
        query += ` WHERE price <= $${values.length + 1}`;
      }
      values.push(maxPrice);
    }
  
    if (sortBy && sortOrder) {
      query += ` ORDER BY ${sortBy} ${sortOrder}`;
    }
  
    if (page !== undefined && limit !== undefined) {
      const offset = (page * limit - limit);
      query += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
      values.push(limit, offset);
    }
    console.log(sortBy);
    console.log(query); 
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
  const query = `UPDATE products SET product_name=$1, image=$2, category=$3, price=$4, description=$5, updated_at=now() WHERE id=$6 returning *`;
  const {product_name, image, category, price, description} = body;
  const values = [product_name, image, category, price, description, id];
  return db.query(query, values);
};

export const deleteProducts = (id: string):Promise<QueryResult<IProducts>> => {
  const query = `DELETE FROM products WHERE id=$1 returning *`;
  const value = [id];
  return db.query(query,value);
};