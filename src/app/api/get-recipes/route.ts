import type { NextRequest } from 'next/server';
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest, context: any): Promise<any> {
  const searchParams = new URL(req.url).searchParams;
  const take =  parseInt(searchParams.get('take') ?? "0")  || 10;
  const order = searchParams.get('order') || 'desc';
  const cameraModel =   searchParams.get('cameraModel')
  const filmSimulation = searchParams.get('filmSimulation')
  const userId = searchParams.get('userId');
  const category = searchParams.get('category');
  
  // Validate query parameters
  if (isNaN(take) || (order !== 'asc' && order !== 'desc')) {
    return {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      },
      body: { error: 'Invalid query parameters' }
    }
  }
  const queryObj = {
    take,
    orderBy: {
      createdAt: order as 'asc' | 'desc'
    }
  } as any;
  if (cameraModel) {
    queryObj.where = {
      cameraModel
    }
  }
  if (userId) {
    queryObj.where = {
      ...queryObj.where,
      userId
    }
  }
  if (filmSimulation) {
    queryObj.where = {
      ...queryObj.where,
      filmSimulation
    }
  }
  if(category){
    queryObj.where = {
      ...queryObj.where,
      category
    }
  }
  const res = await prisma.recipe.findMany(queryObj);

  return Response.json(res);
}