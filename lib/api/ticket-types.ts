import { Evento } from "../actions";
import { db } from "../prisma";
export async function getTicketTypesByEventId(eventId: string) {
  return await db.ticketType.findMany({
    where: {
      eventId: eventId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}
