"use client";

type Props = {
  search: string;
  setSearch: (v: string) => void;

  contacted?: number;
  setContacted: (v?: number) => void;
};

export default function ConsultationFilters({
  search,
  setSearch,
  contacted,
  setContacted,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-3 mb-4">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="جستجو نام، ایمیل، شماره..."
        className="border p-2 rounded-lg flex-1"
      />

      <select
        value={contacted ?? ""}
        onChange={(e) =>
          setContacted(
            e.target.value === "" ? undefined : Number(e.target.value),
          )
        }
        className="border p-2 rounded-lg"
      >
        <option value="">همه وضعیت‌ها</option>
        <option value="0">جدید</option>
        <option value="1">تماس گرفته شده</option>
      </select>
    </div>
  );
}
