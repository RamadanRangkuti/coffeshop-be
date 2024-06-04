import { Request, Response, NextFunction } from "express-serve-static-core";
import jwt, { SignOptions } from "jsonwebtoken";
import { IAuthResponse } from "../models/response.model";
import { AppParams } from "../models/params";
import { IPayload } from "../models/payload.model";


export const jwtOptions: SignOptions = {
  expiresIn: "5m",
  issuer: process.env.JWT_ISSUER
}

export const authorization = (role?: number) => (req: Request<AppParams>, res: Response<IAuthResponse>, next: NextFunction) => {
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

    // const { id: idtes } = req.userPayload as IPayload;
    // const { role } = req.userPayload as IPayload;
    // console.log((payload as IPayload).role);
    // if (role) {
    //   console.log("role ada");
    // } else {
    //   console.log("role gak ada");
    // }
    // console.log(role);
    // console.log()
    if (role) {
      // console.log(role);
      // console.log((payload as IPayload).role);
      if ((payload as IPayload).role != role) {
        return res.status(401).json({
          msg: "Forbidden",
          err: "Don't Have access, only admin!"
        })
      }
    }
    req.userPayload = payload
    next();

  });
};
