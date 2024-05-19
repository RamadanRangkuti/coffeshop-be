import { Request, Response } from "express-serve-static-core";

import { getDetailProducts, getProducts,addProducts, updateProducts, deleteProduts } from "../repositories/product.repo";
import { IBody, IParams, IQuery } from "../models/product.model";

export const get = async (req: Request<{},{},{}, IQuery>, res:Response) => {
  try {
    const {name} = req.query;
    const result = await getProducts(name);
    if(result.rows.length === 0 ){
      return res.status(404).json({
        msg: "Product tidak ditemukan",
        data:[]
      });
    }
    return res.status(200).json({
      msg: "Succes",
      data:result.rows
    });
  } catch (err: unknown) {
    if(err instanceof Error){
      console.log(err.message);
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};

export const getDetail = async (req: Request<IParams>, res:Response) =>{
  const {id} = req.params;
  try {
    const result = await getDetailProducts(id);
    if(result.rows.length === 0 ){
      return res.status(404).json({
        msg: "Product tidak ditemukan",
        data:[]
      });
    }
    return res.status(200).json({
      msg: "Success",
      data:result.rows
    });
  } catch (err) {
    if(err instanceof Error){
      console.log(err.message);
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};

export const add = async (req: Request<{}, {}, IBody>, res:Response) =>{
  try {
    const result = await addProducts(req.body);
    return res.status(201).json({
      message: "Success",
      data:result.rows
    });
  } catch (err) {
    if(err instanceof Error){
      console.log(err.message);
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};

export const update = async (req: Request<IParams, {}, IBody>, res:Response) =>{
  const { id } = req.params;
  try {
    const oldProductResult = await getDetailProducts(id);
    if (oldProductResult.rows.length === 0) {
      return res.status(404).json({
        msg: "Product tidak ditemukan",
        data: []
      });
    }
    const oldProduct = oldProductResult.rows[0];

    const updatedData = { ...oldProduct, ...req.body };
 
    const result = await updateProducts(id, updatedData);
    return res.status(200).json({
      message: "Success updated data",
      data:result.rows
    });
  } catch (err) {
    if(err instanceof Error){
      console.log(err.message);
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};


export const remove = async (req: Request<IParams>, res:Response) =>{
  const {id} = req.params;
  try {
    const result = await deleteProduts(id);
    if(result.rows.length === 0 ){
      return res.status(404).json({
        msg: "Product tidak ditemukan",
        data:[]
      });
    }
    return res.status(200).json({
      msg: "Success Deleted Product",
      data:result.rows
    });
  } catch (err) {
    if(err instanceof Error){
      console.log(err.message);
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};