import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
 
export async function POST(request: NextRequest) {
  const account = await getToken({ req: request, secret: process.env.SECRET });
  const formData = await request.formData();
  const formatedDate = `${formData.get('date')}T${formData.get('hour')}`;

  const bodyData = {
    eventId: formData.get('eventId'),
    type: formData.get('type'),
    date: formatedDate, 
    price: formData.get('price'), 
    ticketsAvailableOnline: formData.get('ticketsAvailableOnline'),
    ticketPurchaseDeadline: formatedDate,
  }
  
  const res = await fetch(`${process.env.apiUrl}/ticketTypes/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-token': `${account?.token}`
    },
    body: JSON.stringify(bodyData)
  })

  const data = await res.json();
  return NextResponse.json(data)
}

export async function PUT(request: NextRequest) {
  const account = await getToken({ req: request, secret: process.env.SECRET });
  const formData = await request.formData();

  const formatedDate = `${formData.get('date')}T${formData.get('hour')}`;
  const bodyData = {
    eventId: formData.get('eventId'),
    type: formData.get('type'),
    date: formatedDate, 
    price: formData.get('price'), 
    ticketsAvailableOnline: formData.get('ticketsAvailableOnline'),
    ticketPurchaseDeadline: formatedDate,
  }
  
  const res = await fetch(`${process.env.apiUrl}/ticketTypes/${formData.get('ticketId')}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-token': `${account?.token}`
    },
    body: JSON.stringify(bodyData)
  });

  const data = await res.json();  
  return NextResponse.json(data)
}

export async function GET(request: NextRequest) { 
  console.log('as', request)
}