import AdminLayout from "../../layout";

interface CoursePageProps {
  params: { id: string };
}

export default function EditCourse({ params }: CoursePageProps) {
  const { id } = params;

  return (
    <AdminLayout>
      <h2 className="text-xl font-bold mb-4">ویرایش دوره #{id}</h2>
      {/* TODO: فرم ویرایش دوره */}
      <p>اینجا فرم ویرایش دوره نمایش داده می‌شود.</p>
    </AdminLayout>
  );
}
