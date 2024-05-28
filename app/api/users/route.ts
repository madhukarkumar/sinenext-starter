// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";

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
