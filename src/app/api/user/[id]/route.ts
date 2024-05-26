import prisma from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest, query: any) {

   try {
    const id = query.params.id;
    
    const res = await prisma.user.findUnique({
        where: {
            kindeId: id
        }
    });
    return Response.json(res);

   } catch (error) {
    console.log(error)
    return Response.json({message: 'Error getting user'}, {status: 500})
   }
}

export async function POST(req: NextRequest, query: any) {
    try {
        const body =  await req.json() as any;
    const id = query.params.id;
    // update base on data fields and keep not updated fields
    await prisma.user.update({
        where: {
            kindeId: id
        },
        data: {
            email: body.email,
            family_name: body.family_name,
            given_name: body.given_name,
            picture: body.picture,
            kindeId: body.kindeId,
            credits: body.credits
        }
    })

    return Response.json({
        message: 'Success'
    });
    } catch (error) {
        console.log(error)
        return Response.json({message: 'Error updating user'}, {status: 500})
    }

}