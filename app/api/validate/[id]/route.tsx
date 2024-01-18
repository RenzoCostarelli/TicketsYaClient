import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string }}) {
    const id = params.id
    const res = await fetch(`${process.env.apiUrl}/tickets/validate/${id}`, {
      method: "PUT",
    });
  
    const data = await res.json();
    return NextResponse.json(data);
}