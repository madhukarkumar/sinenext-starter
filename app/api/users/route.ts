// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";

import { createUser } from "@/lib/user/create";
import { deleteUser } from "@/lib/user/delete";
import { getUsers } from "@/lib/user/get-many";

function handleError(error: unknown) {
  console.error(error);
  const _error = typeof error === "object" && error && "message" in error ? `${error.message}` : "Error";
  return NextResponse.json({ error: _error }, { status: 500 });
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const offset = +(searchParams.get("skip") ?? 0);
    const limit = +(searchParams.get("limit") ?? 10);
    const users = await getUsers({ offset, limit });
    return NextResponse.json(users);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await createUser(body);
    return new NextResponse(null, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = +(searchParams.get("id") ?? 0);
    if (!id) throw new Error("id is undefined");
    await deleteUser(id);
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}
