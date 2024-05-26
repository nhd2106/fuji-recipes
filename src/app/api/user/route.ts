import prisma from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    const body =  await req.json() as any;
    await prisma.user.create({
        data: {
            email: body.email,
            family_name: body.family_name,
            given_name: body.given_name,
            picture: body.picture,
            kindeId: body.kindeId
        }
    })

    return Response.json({
        message: 'Success'
    });

}