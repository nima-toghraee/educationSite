"use client";

import { useEffect, useState } from "react";
import { UsersService } from "@/services/users.service";
import UsersTable from "./UsersTable";
import UsersFilters from "./UsersFilters";
import UsersPagination from "./UsersPagination";
import type { User } from "@/types/article";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<number | undefined>();
  const [active, setActive] = useState<number | undefined>();

  const limit = 20;

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const data = await UsersService.getAll({
        page,
        limit,
        search,
        role,
        is_active: active,
      });

      setUsers(data.data);
      setTotal(data.total);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchUsers();
    }, 300);

    return () => clearTimeout(timeout);
  }, [page, search, role, active]);

  const handleToggle = async (id: number) => {
    const res = await fetch(
      `http://localhost:5000/api/users/${id}/toggle-active`,
      {
        method: "PATCH",
        credentials: "include",
      },
    );

    if (!res.ok) return;

    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, is_active: u.is_active ? 0 : 1 } : u,
      ),
    );
  };

  return (
    <div className="p-6" dir="rtl">
      <h1 className="text-xl font-bold mb-4">مدیریت کاربران</h1>

      {/* FILTERS */}
      <UsersFilters
        search={search}
        setSearch={setSearch}
        role={role}
        setRole={setRole}
        active={active}
        setActive={setActive}
      />

      {/* TABLE */}
      <UsersTable users={users} loading={loading} onToggle={handleToggle} />

      {/* PAGINATION */}
      <UsersPagination
        page={page}
        setPage={setPage}
        total={total}
        limit={limit}
      />
    </div>
  );
}
