import { ParamsDictionary } from "express-serve-static-core";
import { IParams } from "./user.model";
import { IQuery } from "./product.model";

export type AppParams = ParamsDictionary | IParams;
export type QueryParams = IQuery;