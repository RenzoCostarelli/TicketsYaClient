import { Evento } from "../actions";
import { db } from "../prisma";

export async function getEventsByUserId(userId: string) {
  return await db.event.findMany({
    where: {
      userId: userId,
    },
    include: {
      user: true,
    },
  });
}
export async function getAllEvents() {
  return await db.event.findMany({
    include: {
      user: true,
    },
  });
}

export async function createEvent(data: Evento) {
  return await db.event.create({ data });
}
