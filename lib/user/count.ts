import { eleganceServerClient } from "@/lib/elegance/server-client";

export async function countUsers() {
  const result = await eleganceServerClient.controllers.query<{ count: number }[]>({
    query: `SELECT COUNT(*) as count FROM users`,
  });

  return result[0].count;
}
