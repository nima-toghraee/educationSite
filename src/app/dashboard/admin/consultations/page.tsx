"use client";

import { ConsultationService } from "@/services/consultationService";
import { useEffect, useState } from "react";
import ConsultationFilters from "./components/ConsultationFilters";
import ConsultationTable from "./components/ConsultationTable";
import ConsultationPagination from "./components/ConsultationPagination";

type Consultation = {
  id: number;
  name: string;
  phone: string;
  email: string;
  grade_level: string;
  description: string;
  contacted: number;
  created_at: string;
};

export default function ConsultationPage() {
  const [data, setData] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState("");
  const [contacted, setContacted] = useState<number | undefined>();

  const limit = 20;

  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await ConsultationService.getAll({
        page,
        limit,
        search,
        contacted,
      });

      setData(res.data);
      setTotal(res.total);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(t);
  }, [page, search, contacted]);

  const handleToggle = async (id: number, value: number) => {
    await ConsultationService.markContacted(id, value);

    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, contacted: value } : item,
      ),
    );
  };

  return (
    <div className="p-6" dir="rtl">
      <h1 className="text-xl font-bold mb-4">مدیریت مشاوره‌ها</h1>

      <ConsultationFilters
        search={search}
        setSearch={setSearch}
        contacted={contacted}
        setContacted={setContacted}
      />

      <ConsultationTable data={data} onToggle={handleToggle} />

      <ConsultationPagination
        page={page}
        setPage={setPage}
        total={total}
        limit={limit}
      />
    </div>
  );
}
