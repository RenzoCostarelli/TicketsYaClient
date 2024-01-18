import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/app/types/product";
import mercadopago from "mercadopago";
import { CreatePreferencePayload } from "mercadopago/models/preferences/create-payload.model";

mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN!,
})

export async function POST(req: NextRequest, res: NextResponse) {
    const body = await req.json();
    const product: Product = body.product;    
    const URL =  'https://www.mug.ar';

    try {
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
        return NextResponse.json(response);
    } catch (error) {
        console.error('error', error);
        return NextResponse.json(error);
    }
}

