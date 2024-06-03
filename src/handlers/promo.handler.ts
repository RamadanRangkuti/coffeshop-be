import { Request, Response } from "express-serve-static-core";

import { getDetailPromo, getPromo, addPromo, updatePromo, deletePromo } from "../repositories/promo.repo";
import { IBody, IParams, IQuery } from "../models/promo.model";

export const get = async (req: Request<{}, {}, {}, IQuery>, res: Response) => {
  try {
    const { promo_name } = req.query;
    const result = await getPromo(promo_name);
    if (result.rows.length === 0) {
      return res.status(404).json({
        msg: "Promo not found",
        data: []
      });
    }
    return res.status(200).json({
      msg: "Success",
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
    const result = await getDetailPromo(id);
    if (result.rows.length === 0) {
      return res.status(404).json({
        msg: "Promo not found",
        data: []
      });
    }
    return res.status(200).json({
      msg: "Success",
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
  if (req.file?.filename) {
    req.body.image = req.file.filename;
  }
  try {
    const result = await addPromo(req.body);
    return res.status(201).json({
      msg: "Success",
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
  if (req.file?.filename) {
    req.body.image = req.file.filename;
  }
  try {
    const result = await updatePromo(id, req.body);
    if (result.rowCount === 0) {
      return res.status(404).json({
        msg: "error",
        err: "Promo not found",
      });
    }
    return res.status(200).json({
      msg: "Error",
      data: result.rows,
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


export const remove = async (req: Request<IParams>, res: Response) => {
  const { id } = req.params;
  try {
    const result = await deletePromo(id);
    if (result.rows.length === 0) {
      return res.status(404).json({
        msg: "User tidak ditemukan",
        data: []
      });
    }
    return res.status(200).json({
      msg: "Success Deleted Product",
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