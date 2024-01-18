import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
 
export async function POST(request: NextRequest) {
  const account = await getToken({ req: request, secret: process.env.SECRET });
  const formData = await request.formData();

  const hasLimitedPlaces = formData.get('hasLimitedPlaces') === 'on' ? true : false; 
  const bodyData = {
    creatorId: "64cd42cb68560e328c553fbf",
    email: formData.get('email'),
    eventType: formData.get('eventType'),
    title: formData.get('title'), 
    description: formData.get('description'), 
    address: formData.get('address'),
    ticketsAvailableOnline: formData.get('ticketsAvailableOnline'),
    hasLimitedPlaces:  hasLimitedPlaces
  }
  
  const res = await fetch(`${process.env.apiUrl}/events/`, {
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

export async function GET(request: NextRequest, response: NextResponse) { 
  const account = await getToken({ req: request, secret: process.env.SECRET });
  const res = await fetch(`${process.env.apiUrl}/admins/`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'x-token': `${account?.token}`
    },
  })
  const data = await res.json();
  return NextResponse.json(data)
}

export async function PUT(request: NextRequest) {
  const account = await getToken({ req: request, secret: process.env.SECRET });
  const formData = await request.formData();

  const hasLimitedPlaces = formData.get('hasLimitedPlaces') === 'on' ? true : false; 
  const bodyData = {
    creatorId: "64cd42cb68560e328c553fbf",
    email: formData.get('email'),
    eventType: formData.get('eventType'),
    title: formData.get('title'), 
    description: formData.get('description'), 
    address: formData.get('address'),
    ticketsAvailableOnline: formData.get('ticketsAvailableOnline'),
    hasLimitedPlaces:  hasLimitedPlaces
  }
  
  const res = await fetch(`${process.env.apiUrl}/events/${formData.get('eventId')}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-token': `${account?.token}`
    },
    body: JSON.stringify(bodyData)
  })

  const data = await res.json();
  return NextResponse.json(data)
}