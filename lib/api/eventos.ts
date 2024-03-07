import { Evento } from "../actions";
import { db } from "../prisma";

export async function getEventsByUserId(userId: string) {
  return await db.event.findMany({
    where: {
      userId: userId,
      status: {
        not: "DELETED"
      },
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getAllEvents() {
  return await db.event.findMany({
    where: {
      status: {
        not: "DELETED"
      },
    },
    include: {
      user: true,
    },
  });
}

export async function createEvent(data: Evento) {
  return await db.event.create({ data });
}

export async function updateEvent(eventId: string, eventData: Partial<Evento>) {
  return await db.event.update({
    where: {
      id: eventId,
    },
    data: eventData,
  });
}

export async function getEventById(eventId: string) {
  return await db.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      user: true,
      ticketTypes: true,
    },
  });
}
