import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getDashboardStats() {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore.toString();

    const res = await fetch(
      `${API_URL}/admin/dashboard/stats`,
      {
        headers: {
          Cookie: cookieHeader,
        },
        cache: "no-store",
      }
    );

    

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();

    

    return data.data;
  } catch (error) {
    

    return {
      courses: 0,
      articles: 0,
      pendingComments: 0,
    };
  }
}

export async function getActivities() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard/activities`,
    {
      credentials: "include",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("failed");
  }

  return res.json();
}