import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest, query: {
  params: {
    take?: string;
    order?: string;
    cameraModel?: string;
    userId?: string;
  }
}) {
  // Get query parameters
  const take =  query?.params?.take ? parseInt(query.params.take) : 10;
  const order = query?.params?.order || 'asc';
  const cameraModel = query?.params?.cameraModel;
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
  const res = await prisma.recipe.findMany(queryObj);

  return Response.json(res);
}