export interface IParams{
  id : string;
}
export interface IQuery{
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: string;
  promo?: boolean,
  page?: number;
  limit?: number;
}
export interface IBody{
  product_name: string,
  image:string,
  category:string,
  price:number,
  description:string,
}

export interface IProducts extends IBody{
  uid: string,
  created_at: string,
  updated_at?: string | null;
};