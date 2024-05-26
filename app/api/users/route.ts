// app/api/users/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

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





export async function PUT(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id, ...data } = req.body;
        const updatedUser = await prisma.users.update({
            where: { ID: id },
            data,
        });
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to update user' });
    }
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.body;
        const deletedUser = await prisma.users.delete({
            where: { ID: id },
        });
        return res.status(200).json(deletedUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to delete user' });
    }
}

