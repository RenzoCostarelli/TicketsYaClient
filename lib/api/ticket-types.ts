import { TicketType, UpdateTicketTypeType } from "@/types/tickets";
import { Evento } from "../actions";
import { db } from "../prisma";

export async function getTicketTypesByEventId(eventId: string) {
  return await db.ticketType.findMany({
    where: {
      eventId: eventId,
    },
    orderBy: {
      position: "asc",
    },
  });
}

export async function createTicketType(data: TicketType) {
  return await db.ticketType.create({ data });
}

export async function updateTicketType(
  ticketId: string,
  ticketData: Partial<UpdateTicketTypeType>
) {
  return await db.ticketType.update({
    where: {
      id: ticketId,
    },
    data: ticketData,
  });
}
