import { NextRequest } from "next/server";
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
     const searchParams = new URL(req.url).searchParams;
    const userId = searchParams.get('userId'); 
    if(userId) {
        const likes = await prisma.like.findMany({
            where: {
                userId
            }
        }); 
        if(likes.length) {
            const ids = likes.map(like => like.recipeId);
            const recipes = await prisma.recipe.findMany({
                where: {
                    id: {
                        in: ids
                    }
                }
            });
            return Response.json(recipes);
        }
    }
    return Response.json([]);
}