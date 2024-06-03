import { Request, Response, NextFunction } from "express-serve-static-core";
import jwt, { SignOptions } from "jsonwebtoken";
import { IAuthResponse } from "../models/response.model";
import { AppParams } from "../models/params";


export const jwtOptions: SignOptions = {
  expiresIn: "5m",
  issuer: process.env.JWT_ISSUER
}

export const authorization = (req: Request<AppParams>, res: Response<IAuthResponse>, next: NextFunction) => {
  const bearerToken = req.header("Authorization");
  if (!bearerToken) {
    return res.status(403).json({
      msg: "Forbidden",
      err: "Don't Have access"
    })
  }
  const token = bearerToken.split(" ")[1];


  jwt.verify(token, <string>process.env.JWT_KEY, jwtOptions, (err, payload) => {
    if (err) {
      return res.status(403).json({
        msg: err.message,
        err: err.name
      })
    }

    // if (role) {
    //   if ((payload as IPayload).role != 0) {
    //     return res.status(401).json({
    //       msg: "Forbidden",
    //       err: "Don't Have access, only admin!"
    //     })
    //   }
    // }
    req.userPayload = payload
    next();

  });
};
