export interface IParams{
  id : string;
}
export interface IQuery{
  order_number?: string;
  page?: number;
  limit?: number;
}
export interface IBody{
  order_number: string,
  user_id:number,
  product_id:number,
  size:number,
  qty:number,
  sub_total?:number,
  image:string,
  delivery:string,
  status:string,
  payment_method:string
}

export interface IOrder extends IBody{
  uid: string,
  created_at: string,
  updated_at?: string | null;
};