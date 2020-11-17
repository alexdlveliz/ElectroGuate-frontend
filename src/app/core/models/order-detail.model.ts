export interface OrderDetail {
  is_deleted?: boolean;
  deleted_at?: string;
  created_at?: string;
  modified_at?: string;
  amount: number;
  price: number;
  product: number;
  order: number;
}
