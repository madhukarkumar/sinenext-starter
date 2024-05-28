import { prisma } from "@/lib/prisma";

export function countUsers() {
  return prisma.users.count();
}
