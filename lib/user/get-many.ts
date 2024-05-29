import { eleganceServerClient } from "@/lib/elegance/server-client";
import { getUserAvatar } from "@/lib/user/get-avatar";
import { User, UserRow } from "@/types/user";

export async function getUsers(filter: { offset?: number; limit?: number } = {}): Promise<User[]> {
  const { offset = 0, limit = 10 } = filter;

  const users = await eleganceServerClient.controllers.findMany<UserRow[]>({
    collection: "users",
    extra: `ORDER BY FirstName ASC LIMIT ${limit} OFFSET ${offset}`,
  });

  return Promise.all(users.map(async (user) => ({ ...user, avatar: await getUserAvatar() })));
}
