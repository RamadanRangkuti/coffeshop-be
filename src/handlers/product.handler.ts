import { Request, Response } from "express";

export const get = (req: Request, res:Response ) => {
  const products = [
    {
      name : "Nasi Goreng",
      price : 20000,
    },
    {
      name : "Mie Goreng",
      price : 10000,
    }
  ]
  return res.json(products);
}