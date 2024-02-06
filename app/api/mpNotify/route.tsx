// import { NextRequest, NextResponse } from "next/server";
// import mercadopago, { payment } from "mercadopago";

// mercadopago.configure({
//     access_token: process.env.MP_ACCESS_TOKEN!,
// })

// export async function POST(req: NextRequest, res: NextResponse) {
//     const r = await req.json();
//     const topic = r.topic || r.type
//     try {
//         if(topic === "payment") {
//             const paymentId = r.data.id
//             let payment = await mercadopago.payment.findById(Number(paymentId))
//             let paymentStatus = payment.body.status
//             // console.log('payment status', paymentStatus)
//             if (paymentStatus === "approved") {
//                 let offerId = payment.body.external_reference
//                 const response = await fetch(`${process.env.apiUrl}/orders/${offerId}`, {
//                   method: 'PATCH',
//                   headers: {
//                     "Content-Type": "application/json",
//                   },
//                   body: JSON.stringify({"status": "aproved"})
//                 });
//                 const result = await response.json();
//             }
//         }
//     } catch (error) {
//         console.log(error)
//     }

// }
