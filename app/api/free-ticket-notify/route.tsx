import { NextRequest, NextResponse } from "next/server";
import { payOrderHandler } from "@/lib/actions";

export async function POST(req: NextRequest, res: NextResponse) {
  const r = await req.json();

  try {
    await payOrderHandler(r.orderId!);
    return NextResponse.json({ data: "OK" }, { status: 201 });
  } catch (error) {
    console.log(error);
    // Return a response when there is an error
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
