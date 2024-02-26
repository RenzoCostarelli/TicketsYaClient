import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";

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
        // ACTUALIZAR ORDEN
      }
    }
  } catch (error) {
    console.log(error);
  }
}
