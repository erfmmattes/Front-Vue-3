export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  cargo_id: number;
  cargo_name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Cargo {
  id: number;
  name: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}