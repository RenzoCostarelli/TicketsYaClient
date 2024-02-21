import { db } from "../prisma";

export async function createOrder(data: any) {
  return await db.order.create({ data });
}

export async function getOrderById(orderId: string) {
  return await db.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      tickets: true,
      event: true,
    },
  });
}

// Crear type para order
export async function updateOrder(orderId: string, orderData: any) {
  return await db.order.update({
    where: {
      id: orderId,
    },
    data: orderData,
  });
}
