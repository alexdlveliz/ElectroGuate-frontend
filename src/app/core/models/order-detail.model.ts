import { Product } from './product.model';
import { Order } from './order.model';

export interface OrderDetail {
  is_deleted: boolean;
  deleted_at: string;
  created_at: string;
  modified_at: string;
  amount: number;
  price: number;
  product: Product;
  order: Order;
}
