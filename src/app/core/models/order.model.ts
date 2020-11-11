import { User } from './user.model';

export interface Order {
  is_delted: boolean;
  deleted_at: string;
  created_at: string;
  modified_at: string;
  str_deposit_number: string;
  total: number;
  user: User;
}
