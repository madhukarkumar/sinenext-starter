// app/api/users/route.ts
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.users.findMany({
      orderBy: {
        FirstName: "asc", // Order by FirstName in ascending order
      },
    });
    // Convert BigInt values to strings
    const usersWithStrings = users.map((user) => {
      const modifiedUser: { [key: string]: string | null } = {};
      for (const key in user) {
        const value = user[key as keyof typeof user];
        if (value !== null) {
          if (typeof value === "bigint") {
            modifiedUser[key] = value.toString();
          } else {
            modifiedUser[key] = value as string | null;
          }
        } else {
          modifiedUser[key] = null;
        }
      }
      return modifiedUser;
    });
    return NextResponse.json(usersWithStrings);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
