export interface IParams{
  id : string;
}
export interface IQuery{
  username?: string;
  page?: number;
  limit?: number;
}
export interface IBody{
  fullname: string,
  username:string,
  email:string,
  password:number,
  image:string,
  phone:string,
  address: string,
  bank_account:string,
  card:string
}

export interface IUsers extends IBody{
  uid: string,
  created_at: string,
  updated_at?: string | null;
};