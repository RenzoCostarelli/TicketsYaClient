import { NextRequest, NextResponse } from 'next/server'
 
export async function POST(req: NextRequest) {
  const request = await req.json();

  const res = await fetch(`${process.env.apiUrl}/orders/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(  request  ),
  })

  const data = await res.json();
  return NextResponse.json(data)
}