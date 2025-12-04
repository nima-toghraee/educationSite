import CourseClientPage from "../CourseClientPage";

// تعریف ساختار نهایی پارامترها
interface CoursePageParams {
  category: string;
  subSlug?: string;
  courseId: string;
}

// کامپوننت سرور به طور خودکار async است و params آن Promise است.
export default async function CourseServerPage({
  params,
}: {
  // اینجا Type Error رخ داده بود. حالا آن را به Promise تغییر دادیم.
  params: Promise<CoursePageParams>;
}) {
  // 1. Await کردن params برای تبدیل آن از Promise به Object
  const resolvedParams = await params;

  // 2. پاس دادن Object نهایی به کامپوننت کلاینت
  return <CourseClientPage params={resolvedParams} />;
}
