export interface IParams{
  id : string;
}
export interface IQuery{
  promo_name?: string;
}
export interface IBody{
  product_id: string,
  promo_name:string,
  promo_code:string,
  discount:number,
  image:string,
  description:string,
}

export interface IPromo extends IBody{
  uid: string,
  created_at: string,
  updated_at?: string | null;
};