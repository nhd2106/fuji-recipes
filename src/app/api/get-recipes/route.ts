import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest, query: {
  params: {
    take?: string;
    order?: string;
    cameraModel?: string;
    userId?: string;
    filmSimulation?: string;
  },
  searhParams: URLSearchParams
}) {
  // get search params
  const searchParams = new URLSearchParams(req.url);
  // Get query parameters
  const take =  parseInt(searchParams.get('take') ?? "0")  || 10;
  const order = searchParams.get('order') || 'desc';
  const cameraModel =   searchParams.get('cameraModel') || query?.params?.cameraModel;
  const filmSimulation = searchParams.get('filmSimulation') || query?.params?.filmSimulation;
  const userId = query?.params?.userId;
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
  const res = await prisma.recipe.findMany(queryObj);

  return Response.json(res);
}