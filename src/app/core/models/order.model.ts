import { User } from './user.model';

export interface Order {
  is_deleted?: boolean;
  deleted_at?: string;
  created_at?: string;
  modified_at?: string;
  paypal_order_id: string;
  total?: number;
  zip_code: string;
  user: number;
  details?: string;
}
