import { NextRequest, NextResponse } from 'next/server'
 
export async function POST(request: NextRequest) {

  const formData = await request.formData();
  
  const bodyData = {
    event: formData.get('id'),
    purchaser: { 
      purchaserFirstName: formData.get('name'), 
      purchaserLastName: formData.get('last-name'), 
      purchaserDni: formData.get('dni'),
      purchaserEmail: formData.get('email')
    },
    attendee: { 
      attendeeFirstName: formData.get('name'), 
      attendeeLastName: formData.get('last-name'), 
      attendeeDni: formData.get('dni')
    }
  }
  
  const res = await fetch(`${process.env.apiUrl}/tickets/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( { "tickets":[ bodyData ] } ),
  })

  const data = await res.json();

  return NextResponse.json(data)
}