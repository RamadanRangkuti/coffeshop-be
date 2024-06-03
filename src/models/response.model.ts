import { IUsers } from "./user.model";
import { IProducts } from "./product.model";


interface IPaginationMeta {
  totalData?: number;
  totalPage?: number;
  page: number;
  prevLink: string | null;
  nextLink: string | null;
}

export interface IBasicResponse {
  msg: string,
  data?: any[];
  err?: string;
};

export interface IProductResponse extends IBasicResponse {
  data?: IProducts[];
}


export interface IUserResponse extends IBasicResponse {
  data?: IUsers[];
};

export interface IAuthResponse extends IBasicResponse {
  data?: { token: string }[];
}