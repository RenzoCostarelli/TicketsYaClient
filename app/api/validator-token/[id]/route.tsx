import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: { id: string }}) { 
    const account = await getToken({ req: request, secret: process.env.SECRET });
    const req = await request;
    const res = await fetch(`${process.env.apiUrl}/token/${params.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-token': `${account?.token}`
      }
    });
  
    const data = await res.json();  
    return NextResponse.json(data);
  }