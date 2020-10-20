export interface User {
  id: number;
  str_name: string;
  str_surname: string;
  str_password: string;
  str_email: string;
  str_role: string;
  str_phone_number: string;
  is_active?: boolean;
  created_at?: string;
  modified_at?: string;
  is_deleted?: boolean;
  deleted_at?: string;
}
