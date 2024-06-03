export interface IParams {
  id: string;
}
export interface IQuery {
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  promo?: boolean,
  page?: string;
  limit?: string;
}
export interface IBody {
  product_name: string,
  image?: string | null,
  category: string,
  price: number,
  description: string,
}

export interface IProducts extends IBody {
  created_at: string,
  updated_at?: string | null;
};