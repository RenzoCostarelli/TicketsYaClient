import { NextRequest, NextResponse } from "next/server";
import mercadopago, { MercadoPagoConfig, Preference } from "mercadopago";
import { Product } from "@/types/product";
import { redirect } from "next/navigation";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const product: Product = body.product;
  const URL = "https://www.mug.ar";
  //   return NextResponse.json(req.body);
  try {
    const preference = await new Preference(client).create({
      body: {
        items: [
          {
            // id: `${product.title}-${Math.floor(Math.random() * 100000)}`,
            // title: product.title,
            // unit_price: product.price,
            // quantity: 1,
            id: `id del producto`,
            title: "titulo",
            unit_price: 2000,
            quantity: 1,
          },
        ],
        // external_reference: product.orderId,
        auto_return: "approved",
        back_urls: {
          success: `${URL}`,
          failure: `${URL}`,
        },
        notification_url: `${URL}/api/mpNotify`,
      },
    });

    return NextResponse.json(preference.sandbox_init_point);
  } catch (error) {
    console.error("error", error);
    return NextResponse.json(error);
  }
}
