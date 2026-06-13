export type Lesson = {
  id: number;
  title: string;
  description: string;
  video_file: string; 
  upload_date: string; 
  view_count: number;
  is_preview: boolean;
  is_free: boolean;
  order_index: number;
  duration: number; 
  course_id: number;
  thumbnail_url?: string;
  video_url?: string;

};

