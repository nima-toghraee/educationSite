import { NextResponse } from "next/server";
import { articles } from "@/lib/articles";

export async function GET() {
  return NextResponse.json(articles);
}
