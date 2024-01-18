import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function DELETE(request: NextRequest ) { 
    const account = await getToken({ req: request, secret: process.env.SECRET });
    const _id = await request.url.split('/').at(-1);
    
    const res = await fetch(`${process.env.apiUrl}/ticketTypes/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-token': `${account?.token}`
      }
    });
  
    const data = await res.json();  
    return NextResponse.json(data);
  }