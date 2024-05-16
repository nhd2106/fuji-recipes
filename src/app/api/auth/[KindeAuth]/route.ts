import { handleAuth }  from '@kinde-oss/kinde-auth-nextjs/server';
import { NextRequest} from 'next/server';

export async function GET(req: NextRequest, { params }: { params: any  }): Promise<any> {

const endpoint = params.KindeAuth;
return handleAuth(req, endpoint);
 
}