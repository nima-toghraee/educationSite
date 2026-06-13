const BASE_URL = "http://localhost:5000/api/users";

export const UsersService = {
  getAll: async ({
    page = 1,
    limit = 20,
    search = "",
    role,
    is_active,
  }: {
    page?: number;
    limit?: number;
    search?: string;
    role?: number;
    is_active?: number;
  }) => {
    const params = new URLSearchParams();

    params.append("page", String(page));
    params.append("limit", String(limit));

    if (search) params.append("search", search);
    if (role !== undefined) params.append("role", String(role));
    if (is_active !== undefined)
      params.append("is_active", String(is_active));

    const res = await fetch(`${BASE_URL}?${params.toString()}`, {
      credentials: "include",
    });

    return res.json();
  },

  delete: async (id: number) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    return res.json();
  },

  toggleActive: async (id: number) => {
    const res = await fetch(
      `${BASE_URL}/${id}/toggle-active`,
      {
        method: "PATCH",
        credentials: "include",
      }
    );

    return res.json();
  },
};