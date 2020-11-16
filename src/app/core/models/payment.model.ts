export interface Payment {
  is_deleted?: boolean;
  deleted_at?: string;
  created_at?: string;
  modified_at?: string;
  str_card_number: string;
  str_name: string;
  card_date?: string;
  user: number;
  order: number;
}
