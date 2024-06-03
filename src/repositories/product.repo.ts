import { QueryResult } from "pg";
import db from "../configs/connection";
import { IProducts, IBody, IQuery } from "../models/product.model";

export const getProducts = ({ category, limit = "5", maxPrice, minPrice, name, page = "1", promo, sort }: IQuery): Promise<QueryResult<IProducts>> => {
  let query = `SELECT id, uid, product_name, image, category, price, description, created_at, updated_at FROM products`;
  const values = [];

  if (promo) {
    query += ` JOIN promo pr ON products.id = pr.product_id`
  }

  if (name) {
    query += ` WHERE product_name ILIKE $${values.length + 1}`;
    values.push(`%${name}%`);
  }

  if (category) {
    if (query.includes('WHERE')) {
      query += ` AND category = $${values.length + 1}`;
    } else {
      query += ` WHERE category = $${values.length + 1}`;
    }
    values.push(`%${category}%`);
  }

  if (minPrice) {
    if (query.includes('WHERE')) {
      query += ` AND price >= $${values.length + 1}`;
    } else {
      query += ` WHERE price >= $${values.length + 1}`;
    }
    values.push(minPrice);
  }

  if (maxPrice) {
    if (query.includes('WHERE')) {
      query += ` AND price <= $${values.length + 1}`;
    } else {
      query += ` WHERE price <= $${values.length + 1}`;
    }
    values.push(maxPrice);
  }


  if (sort) {
    let orderByClause = '';
    if (sort === 'cheapest') {
      orderByClause = ` ORDER BY price ASC`;
    } else if (sort === 'priciest') {
      orderByClause = ` ORDER BY price DESC`;
    } else if (sort === 'a-z') {
      orderByClause = ` ORDER BY product_name ASC`;
    } else if (sort === 'z-a') {
      orderByClause = ` ORDER BY product_name DESC`;
    } else if (sort === 'latest') {
      orderByClause = ` ORDER BY created_at ASC`;
    } else if (sort === 'longest') {
      orderByClause = ` ORDER BY created_at DESC`;
    }

    query += orderByClause;
  }


  if (page && limit) {
    const offset = (parseInt(page) * parseInt(limit) - parseInt(limit));
    query += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
    values.push(limit, offset);
  }
  return db.query(query, values);
};


export const getTotalProducts = ({ name }: IQuery): Promise<QueryResult<{ total_product: string }>> => {
  let query = 'select count(*) as "total_product" from products';
  const values = [];
  if (name) {
    query += " where product_name ilike $1";
    values.push(`%${name}%`);
  }
  return db.query(query, values);
};

export const getDetailProducts = (id: string): Promise<QueryResult<IProducts>> => {
  const query = `SELECT id, uid, product_name, image, category, price, description, created_at, updated_at FROM products WHERE id=$1`;
  const value = [id];
  return db.query(query, value);
};

export const addProducts = (body: IBody): Promise<QueryResult<IProducts>> => {
  const query = `INSERT INTO products (product_name, image, category, price, description) values ($1,$2,$3,$4,$5) returning *`;
  const { product_name, image, category, price, description } = body;
  const values = [product_name, image, category, price, description];
  return db.query(query, values);
};

// export const updateProducts = (id: string, body: IBody): Promise<QueryResult<IProducts>> => {
//   let query = `UPDATE products SET `;
//   let fields: string[] = [];
//   let values: (string | number | null)[] = [];

//   const { product_name, image, category, price, description } = body;

//   if (product_name) {
//     fields.push(`product_name = $${fields.length + 1}`);
//     values.push(product_name);
//   }

//   if (image) {
//     fields.push(`image = $${fields.length + 1}`);
//     values.push(image);
//   }

//   if (category) {
//     fields.push(`category = $${fields.length + 1}`);
//     values.push(category);
//   }

//   if (price) {
//     fields.push(`price = $${fields.length + 1}`);
//     values.push(price);
//   }

//   if (description) {
//     fields.push(`description = $${fields.length + 1}`);
//     values.push(description);
//   }

//   fields.push(`updated_at = now()`);

//   query += fields.join(', ');

//   const idNumber = values.length + 1;
//   query += ` WHERE id = $${idNumber} returning *`;
//   values.push(id);

//   // console.log('Query:', query);
//   // console.log('Values:', values);

//   return db.query(query, values);
// };


export const updateProducts = (id: string, body: IBody): Promise<QueryResult<IProducts>> => {
  let query = `UPDATE products SET `;
  let fields: string[] = [];
  let values: (string | number | null)[] = [];

  const { product_name, image, category, price, description } = body;

  if (product_name) {
    fields.push(`product_name = $${fields.length + 1}`);
    values.push(product_name);
  }

  if (image) {
    fields.push(`image = $${fields.length + 1}`);
    values.push(image);
  }

  if (category) {
    fields.push(`category = $${fields.length + 1}`);
    values.push(category);
  }

  if (price) {
    fields.push(`price = $${fields.length + 1}`);
    values.push(price);
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

export const deleteProducts = (id: string): Promise<QueryResult<IProducts>> => {
  const query = `DELETE FROM products WHERE id=$1 returning *`;
  const value = [id];
  return db.query(query, value);
};