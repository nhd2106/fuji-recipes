import prisma from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    const body =  await req.json() as any;
    const isLike = await prisma.like.findFirst({
        where: {
            userId: body.userId,
            recipeId: body.recipeId
        }
    });

    if(!isLike) {
        await prisma.like.create({
            data:  {
                userId: body.userId,
                recipeId: body.recipeId,
            }
        });
        await prisma.recipe.update({
            where: {
                id: body.recipeId
            },
            data: {
                likes: {
                    increment: 1,
                }
            }
        });
    }

    return Response.json({
        message: 'Success'
    });

}