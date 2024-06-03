import bcrypt from 'bcrypt';
import { Request, Response } from "express-serve-static-core";

import { getDetailUsers, getUsers, addUsers, updateUsers, deleteUsers } from "../repositories/user.repo";
import { IBody, IParams, IQuery } from "../models/user.model";
import { IUserResponse } from "../models/response.model";
import { IPayload } from '../models/payload.model';

export const get = async (req: Request<{}, {}, {}, IQuery>, res: Response<IUserResponse>) => {
  try {
    const { username, page = 1, limit = 3 } = req.query;
    const result = await getUsers(username, page, limit);
    if (result.rows.length === 0) {
      return res.status(404).json({
        msg: "User not found",
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

export const getDetail = async (req: Request<IParams>, res: Response<IUserResponse>) => {
  const { id } = req.params;
  const { id: idtes } = req.userPayload as IPayload;
  console.log(idtes);
  // // req.userPayload
  try {
    const result = await getDetailUsers(<string>id);
    if (result.rows.length === 0) {
      return res.status(404).json({
        msg: "User not found",
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

export const add = async (req: Request<{}, {}, IBody>, res: Response<IUserResponse>) => {
  if (req.file?.filename) {
    req.body.image = req.file.filename;
  }
  try {
    const result = await addUsers(req.body);
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

export const update = async (req: Request<IParams, {}, IBody>, res: Response<IUserResponse>) => {
  const { id } = req.params;
  if (req.file?.filename) {
    req.body.image = req.file.filename;
  }
  const { password } = req.body;
  try {
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(<string>password, salt);
    const result = await updateUsers(id, req.body, hashed);
    if (result.rowCount === 0) {
      return res.status(404).json({
        msg: "error",
        err: "Product not found",
      });
    }
    return res.status(200).json({
      msg: "success",
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
    const result = await deleteUsers(id);
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