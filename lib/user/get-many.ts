import { prisma } from "@/lib/prisma";
import { getUserAvatar } from "@/lib/user/get-avatar";
import { User } from "@/types/user";

export async function getUsers(filter: { skip?: number; limit?: number } = {}): Promise<User[]> {
  const { skip = 0, limit = 10 } = filter;

  const users = (
    await prisma.users.findMany({
      orderBy: {
        FirstName: "asc", // Order by FirstName in ascending order
      },
    })
  ).slice(skip, skip + limit);

  return Promise.all(users.map(async ({ ID, ...user }) => ({ ...user, avatar: await getUserAvatar() })));
}
