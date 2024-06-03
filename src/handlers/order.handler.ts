import { Request, Response } from "express-serve-static-core";

import { getDetailOrder, getOrder, addOrder, updateOrder, deleteOrder } from "../repositories/order.repo";
import { getDetailProducts } from "../repositories/product.repo";
import { IBody, IParams, IQuery } from "../models/order.model";

export const get = async (req: Request<{}, {}, {}, IQuery>, res: Response) => {
  try {
    const { order_number, page = 1, limit = 3 } = req.query;
    const result = await getOrder(order_number, page, limit);
    if (result.rows.length === 0) {
      return res.status(404).json({
        msg: "Order not found",
        data: []
      });
    }
    return res.status(200).json({
      msg: "Succes",
      data: result.rows
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};

export const getDetail = async (req: Request<IParams>, res: Response) => {
  const { id } = req.params;
  try {
    const result = await getDetailOrder(id);
    if (result.rows.length === 0) {
      return res.status(404).json({
        msg: "Order not found",
        data: []
      });
    }
    return res.status(200).json({
      msg: "Successs",
      data: result.rows
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};

export const add = async (req: Request<{}, {}, IBody>, res: Response) => {
  try {
    const reqProd = String(req.body.product_id);
    const prod = await getDetailProducts(reqProd);
    if (prod.rows.length === 0) {
      return res.status(404).json({
        msg: "Product not found",
        data: []
      });
    }
    const price = prod.rows[0].price;
    const sub_total = price * req.body.qty;
    const newOrder = {
      ...req.body,
      sub_total
    };
    const result = await addOrder(newOrder);
    return res.status(201).json({
      message: "Success",
      data: result.rows
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};

export const update = async (req: Request<IParams, {}, IBody>, res: Response) => {
  const { id } = req.params;
  try {
    const oldProductResult = await getDetailOrder(id);
    if (oldProductResult.rows.length === 0) {
      return res.status(404).json({
        msg: "Order not found",
        data: []
      });
    }
    const oldProduct = oldProductResult.rows[0];

    const updatedData = { ...oldProduct, ...req.body };

    const result = await updateOrder(id, updatedData);
    return res.status(200).json({
      message: "Successs updated data",
      data: result.rows
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};


export const remove = async (req: Request<IParams>, res: Response) => {
  const { id } = req.params;
  try {
    const result = await deleteOrder(id);
    if (result.rows.length === 0) {
      return res.status(404).json({
        msg: "Order tidak ditemukan",
        data: []
      });
    }
    return res.status(200).json({
      msg: "Successss Deleted Order",
      data: result.rows
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};