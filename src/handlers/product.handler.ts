import { Request, Response } from "express-serve-static-core";

import { getDetailProducts, getProducts, addProducts, updateProducts, deleteProducts, getTotalProducts } from "../repositories/product.repo";
import { IBody, IParams, IQuery } from "../models/product.model";
import { IProductResponse } from "../models/response.model";
import getLink from "../helpers/getLink";

export const get = async (req: Request<{}, {}, {}, IQuery>, res: Response) => {
  try {
    const result = await getProducts(req.query);
    if (result.rows.length === 0) {
      return res.status(404).json({
        msg: "Product not found",
        data: []
      });
    }
    const dataProduct = await getTotalProducts(req.query);
    console.log(dataProduct);
    const page = parseInt((req.query.page as string) || "1");
    const totalData = parseInt(dataProduct.rows[0].total_product);
    const totalPage = Math.ceil(totalData / parseInt(req.query.limit as string));
    console.log(req.baseUrl);
    return res.status(200).json({
      msg: "Success",
      data: result.rows,
      meta: {
        totalData,
        totalPage,
        page,
        prevLink: page > 1 ? getLink(req, "previous") : null,
        nextLink: page != totalPage ? getLink(req, "next") : null,
      },
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

export const getDetail = async (req: Request<IParams>, res: Response<IProductResponse>) => {
  const { id } = req.params;
  try {
    const result = await getDetailProducts(id);
    if (result.rows.length === 0) {
      return res.status(404).json({
        msg: "Product not found",
        data: []
      });
    }
    return res.status(200).json({
      msg: "Success",
      data: result.rows
    });
  } catch (err) {
    if (err instanceof Error) {
      return console.log(err.message);
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};

export const add = async (req: Request<{}, {}, IBody>, res: Response<IProductResponse>) => {
  if (req.file?.filename) {
    req.body.image = req.file.filename;
  }
  try {
    const result = await addProducts(req.body);
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

export const update = async (req: Request<IParams, {}, IBody>, res: Response<IProductResponse>) => {
  const { id } = req.params;
  if (req.file?.filename) {
    req.body.image = req.file.filename;
  }
  try {
    const result = await updateProducts(id, req.body);
    if (result.rowCount === 0) {
      return res.status(404).json({
        msg: "error",
        err: "Product not found",
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

// export const updates = async (req: Request<IParams, {}, IBody>, res: Response) => {
//   const { id } = req.params;
//   try {
//     const result = await updateProducts(id, req.body);
//     if (result.rowCount === 0) {
//       return res.status(404).json({
//         msg: "error",
//         err: "Product not found",
//       });
//     }
//     return res.status(200).json({
//       msg: "success",
//       data: result.rows,
//     });
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       console.log(err.message);
//     }
//     return res.status(500).json({
//       msg: "Error",
//       err: "Internal Server Error",
//     });
//   }
// };



export const remove = async (req: Request<IParams>, res: Response<IProductResponse>) => {
  const { id } = req.params;
  try {
    const result = await deleteProducts(id);
    if (result.rows.length === 0) {
      return res.status(404).json({
        msg: "Product tidak ditemukan",
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