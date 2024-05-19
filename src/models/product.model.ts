export interface IParams{
  id : string;
}
export interface IQuery{
  name?: string;
}
export interface IBody{
  id?:number,
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