import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import AdminBreadcrumb from "./components/AdminBreadcrumb";

type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return (
    <>
      <AdminHeader />

      <div className="flex min-h-screen bg-gray-100">
        <AdminSidebar />

        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
            <AdminBreadcrumb />
            <div className="mt-2">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
