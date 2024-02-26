import { TicketOrderType } from "@/types/tickets";
import { db } from "../prisma";

export async function createTicketOrder(data: TicketOrderType[]) {
  return await db.ticketOrder.createMany({ data });
}
