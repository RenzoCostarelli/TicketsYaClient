import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { payOrderHandler } from "@/lib/actions";

// ESTE TOKEN PUEDE SER EL GLOBAL DE LA MARCA,
// NO NECESITA SER EL DEL USUARIO Y BASICAMENTE
// ACA NO PODEMOS CONSEGUIR EL DEL USUARIO,
// LO USAMOS SOLO PARA VER EL ESTADO DLE PAGO
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest, res: NextResponse) {
  const r = await req.json();
  const topic = r.topic || r.type;

  try {
    if (topic === "payment") {
      const paymentId = r.data.id;
      const payment = await new Payment(client).get({ id: paymentId });

      if (payment.status === "approved") {
        let orderId = payment.external_reference;
        console.log("payment", payment);
        await payOrderHandler(orderId!);
        return NextResponse.json({ data: "OK" }, { status: 201 });
      } else {
        // Return a different response if payment status is not approved
        return NextResponse.json(
          { data: "Payment not approved" },
          { status: 400 }
        );
      }
    } else {
      // Return a response when topic is not 'payment'
      return NextResponse.json({ data: "Invalid topic" }, { status: 400 });
    }
  } catch (error) {
    console.log(error);
    // Return a response when there is an error
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  return NextResponse.json({ error: "Unhandled path" }, { status: 500 });
}
