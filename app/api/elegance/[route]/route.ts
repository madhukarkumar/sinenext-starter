import { Routes } from "@singlestore/elegance-sdk/server";
import { NextRequest, NextResponse } from "next/server";

import { eleganceServerClient } from "@/lib/elegance/server-client";

export async function POST(request: NextRequest, { params }: { params: { route: Routes } }) {
  try {
    const result = await eleganceServerClient.handleRoute(params.route, await request.json());
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(error, { status: error.status });
  }
}
