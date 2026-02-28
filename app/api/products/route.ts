import { NextRequest, NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/products-data";
import { Product } from "@/types";

// In-memory store for demo — swap for Neon DB queries in production
let store: Product[] = [...PRODUCTS];

export async function GET() {
  return NextResponse.json(store);
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get("x-admin-token");
  if (auth !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body: Product = await req.json();
  store = store.filter((p) => p.id !== body.id);
  store.push(body);
  return NextResponse.json(body, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const auth = req.headers.get("x-admin-token");
  if (auth !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await req.json();
  store = store.filter((p) => p.id !== id);
  return NextResponse.json({ ok: true });
}
