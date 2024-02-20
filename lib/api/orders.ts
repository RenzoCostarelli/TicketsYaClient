import { db } from "../prisma";

export async function createOrder(data: any) {
  return await db.order.create({ data });
}
