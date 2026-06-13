"use client";

type Props = {
  page: number;
  setPage: (v: number) => void;
  total: number;
  limit: number;
};

export default function ConsultationPagination({
  page,
  setPage,
  total,
  limit,
}: Props) {
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex items-center gap-2 mt-4">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        قبلی
      </button>

      <span>
        صفحه {page} از {totalPages || 1}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        بعدی
      </button>
    </div>
  );
}
