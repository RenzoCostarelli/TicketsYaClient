import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/types/product";
import { MercadoPagoConfig, Payment } from "mercadopago";
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ADDEDD_TOKEN!});

export async function POST(req: NextRequest, res: NextResponse) {
    const body = await req.json().then(data => data as { data: { id: string}});
    //const product: Product = body.product;    
    const URL =  'https://www.mug.ar';

    const payment = new Payment(client).get({ id: body.data.id })
   try {
    /*
        const preference: CreatePreferencePayload = {
            items: [
                {
                    title: product.title,
                    unit_price: product.price,
                    quantity: 1
                }
            ],
            external_reference: product.offerId,
            auto_return: 'approved',
            back_urls: {
                success: `${URL}`,
                failure: `${URL}`
            },
            notification_url: `${URL}/api/mpNotify`
        }
        const response = await mercadopago.preferences.create(preference)
        return NextResponse.json(response);*/
    } catch (error) {
        console.error('error', error);
        return NextResponse.json(error);
    }
}

