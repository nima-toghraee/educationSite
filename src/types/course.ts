export type Course = {
  id: number;
  title: string;
  category: string;
  description: string;
  thumbnail_url: string;
  views_count: number;
  is_published: boolean;
  total_duration: number; // بر حسب دقیقه یا ثانیه
  created_at: string; // یا Date، اگر لازم شد parse کنید
  price: number;
  is_free: boolean;
  grade?: string;
  field?: string;
};

export type Category = {
  id: number;
  name: string;
};

export type Access = {
  is_purchased: boolean; // آیا کاربر دوره را خریداری کرده یا دوره رایگان است
  locked: boolean;       // آیا درس قفل است یا باز
};