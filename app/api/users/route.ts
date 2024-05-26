// app/api/users/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const users = await prisma.users.findMany({
            orderBy: {
                FirstName: 'asc', // Order by FirstName in ascending order
            },
        });
        // Convert BigInt values to strings
        const usersWithStrings = users.map((user) => {
            const modifiedUser: { [key: string]: string | null } = {};
            for (const key in user) {
                if (typeof user[key as keyof typeof user] === 'bigint') {
                    modifiedUser[key] = user[key as keyof typeof user].toString();
                } else {
                    modifiedUser[key] = user[key as keyof typeof user] as string | null;
                }
            }
            return modifiedUser;
        });
        return NextResponse.json(usersWithStrings);
    } catch (error) {
        console.error(error);
        return NextResponse.error("Failed to fetch users", 500);
    }
}
export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const newUser = await prisma.users.create({data});
        return NextResponse.json(newUser);
    } catch (error) {
        console.error(error);
        return NextResponse.error("Failed to create new user", 500);
    }
}

export async function PUT() {
  return NextResponse.error("Method not allowed", 405);
}

export async function DELETE() {
  return NextResponse.error("Method not allowed", 405);
}

