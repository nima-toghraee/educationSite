"use client";

type Props = {
  search: string;
  setSearch: (v: string) => void;

  role?: number;
  setRole: (v?: number) => void;

  active?: number;
  setActive: (v?: number) => void;
};

export default function UsersFilters({
  search,
  setSearch,
  role,
  setRole,
  active,
  setActive,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-3 mb-4">
      {/* SEARCH */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="جستجو نام یا ایمیل..."
        className="border p-2 rounded-lg flex-1"
      />

      {/* ROLE FILTER */}
      <select
        value={role ?? ""}
        onChange={(e) =>
          setRole(e.target.value ? Number(e.target.value) : undefined)
        }
        className="border p-2 rounded-lg"
      >
        <option value="">همه نقش‌ها</option>
        <option value="1">ادمین</option>
        <option value="2">کاربر</option>
      </select>

      {/* ACTIVE FILTER */}
      <select
        value={active ?? ""}
        onChange={(e) =>
          setActive(e.target.value ? Number(e.target.value) : undefined)
        }
        className="border p-2 rounded-lg"
      >
        <option value="">همه وضعیت‌ها</option>
        <option value="1">فعال</option>
        <option value="0">غیرفعال</option>
      </select>
    </div>
  );
}
