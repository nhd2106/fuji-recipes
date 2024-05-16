import OpenAI from 'openai';
import type { NextApiResponse, NextApiRequest } from 'next'
import { NextRequest, NextResponse } from 'next/server'

const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
  });


export  async function POST(req: NextRequest, res: NextResponse ) {
    const formData = (await req.formData()) as any;
    const prompt = (formData.get("prompt") as string) ?? '';
    const thread = await openai.beta.threads.create();
    const message = await openai.beta.threads.messages.create(
        thread.id,
        {
          role: "user",
          content: prompt,
        }
      
      );

     const result = await openai.beta.threads.runs.create(thread.id, {
        assistant_id: 'asst_bA9sZ1BMlH8g0mz7SaF3uEOX',
        stream: true
      });
     const response = result.toReadableStream() as any;

    return new Response(response,  {
        headers: {
            'Content-Type': 'text/plain',
            'Transfer-Encoding': 'chunked',
            'Connection': 'keep-alive',
        }
    } )

}
