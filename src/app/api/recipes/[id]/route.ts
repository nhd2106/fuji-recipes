import prisma from '@/lib/prisma'
export async function GET(req: any, query: any) {

   try {
    let images = [] as any;
    const id = query.params.id;
    
    const res = await prisma.recipe.findUnique({
        where: {
            id: id
        }
    });
    if(res?.id) {
         images = await prisma.imageKitImage.findMany({
            where: {
                recipeId: id
            }
        });
        
    }
    return Response.json({
        ...res,
        images
    
    });

   } catch (error) {
    return Response.json({message: 'Error getting recipe'}, {status: 500})
   }
}