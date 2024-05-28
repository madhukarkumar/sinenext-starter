import { NextRequest, NextResponse } from "next/server";
import { Routes } from "@singlestore/elegance-sdk/server";
import { eleganceServerClient } from "@/services/eleganceServerClient";

export async function POST(
  request: NextRequest,
  { params }: { params: { route: Routes } }
) {
  try {
    console.log(request);
    const result = await eleganceServerClient.handleRoute(
      params.route,
      await request.json()
    );
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(error, { status: error.status });
  }
}
