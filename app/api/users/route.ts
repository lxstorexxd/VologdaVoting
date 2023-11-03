import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Contestant } from '@prisma/client';

interface Nomination {
    id: number;
    name: string;
    votes: number;
    contestants: Contestant[];
}

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const nomination = await prisma.nomination.findMany();
        const data: Nomination[] = await Promise.all(
            nomination.map(async (nomination: any) => {
                const contestants: Contestant[] = await prisma.contestant.findMany({
                    where: { nominationId: nomination.id },
                });
                return { ...nomination, contestants };
            })
        );

        return NextResponse.json(data);
    } catch (e) {
        return NextResponse.json(e);
    }

}

export async function POST(req: NextRequest, res: NextResponse) {
    const contestantId = await req.json()
    try {
        const contestant = await prisma.contestant.findUnique({
            where: { id: contestantId },
        });

        if (!contestant) {
            return NextResponse.json({ status: 404, message: 'Contestant not found' });
        }

        const updatedNomination = await prisma.contestant.update({
            where: { id: contestantId },
            data: {
                votes: {
                    increment: 1,
                }
            },
        });

        return NextResponse.json(updatedNomination);
    } catch (error) {
        console.error('Error while voting:', error);
        return NextResponse.json({ status: 500, message: 'Internal Server Error' });
    }
}


