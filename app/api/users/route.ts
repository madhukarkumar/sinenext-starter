// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";

import { createUser } from "@/lib/user/create";
import { getUsers } from "@/lib/user/get-many";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const skip = +(searchParams.get("skip") ?? 0);
    const limit = +(searchParams.get("limit") ?? 10);
    const users = await getUsers({ skip, limit });
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await createUser(body);
    return new NextResponse(null, { status: 201 });
  } catch (error) {
    console.error(error);
    const _error = typeof error === "object" && error && "message" in error ? `${error.message}` : "Error";
    return NextResponse.json({ error: _error }, { status: 500 });
  }
}
