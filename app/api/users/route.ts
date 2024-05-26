// app/api/users/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest } from 'next';

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
                const value = user[key as keyof typeof user];
                if (value !== null) {
                    if (typeof value === 'bigint') {
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



export async function POST(req: NextApiRequest) {
    try {
        const data = await req.json();
        const newUser = await prisma.users.create({data});
        return NextResponse.json(newUser);
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}

export async function PUT() {
  return NextResponse.error();
}

export async function DELETE() {
  return NextResponse.error();
}

