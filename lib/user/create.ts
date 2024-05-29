import { prisma } from "@/lib/prisma";
import { User } from "@/types/user";

export function createUser(data: User) {
  return prisma.users.create({ data });
}
