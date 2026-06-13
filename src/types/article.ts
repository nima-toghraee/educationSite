export type Article = {
  id: number;
  title: string;
  summary: string;
  content: string;
  publish_date: string;
  author_id: number;
  category_id: number;
  thumbnail?: string;
  created_at: string;
  view_count: number;
  author_name?: string;
  category_name?:string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  is_active: number;
  role_id: number;
  last_login?: string;
};