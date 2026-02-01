import { headers } from "next/headers";

export default function AdminBreadcrumb() {
  const pathname = headers().get("x-pathname") || "";

  const segments = pathname.split("/").filter(Boolean).slice(1);

  return (
    <div className="mb-4 text-sm text-gray-500">
      admin
      {segments.map((seg) => (
        <span key={seg}> / {seg}</span>
      ))}
    </div>
  );
}
