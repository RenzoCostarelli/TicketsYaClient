"use server";

import * as Eventos from "@/lib/api/eventos";
import * as TicketTypes from "@/lib/api/ticket-types";
import { revalidatePath } from "next/cache";
// Type temporal
export type Evento = {
  title: string;
  description: string;
  location: string;
  userId: string;
  image: string;
  dates: string;
};

export async function createEvent(data: Evento) {
  try {
    const result = await Eventos.createEvent(data);
    console.log("Evento creado:", result);
  } catch (error) {
    console.log("Error creando el evento:", error);
    throw new Error("Error creando el evento");
  }

  revalidatePath("/dashboard");
}

export async function updateEvent(data: Evento, eventId: string) {
  try {
    const result = await Eventos.updateEvent(eventId, data);
    console.log("Evento editado:", result);
    revalidatePath(`/dashboard/evento/${result.id}`);
  } catch (error) {
    console.log("Error editando el evento:", error);
    throw new Error("Error editando el evento");
  }
}

export async function getEventById(eventId: string) {
  try {
    const result = await Eventos.getEventById(eventId);
    return result;
  } catch (error) {
    console.log("Error en getEventById:", error);
    throw new Error("Error o");
  }
}

export async function getTicketTypesByEventId(eventId: string) {
  try {
    const result = await TicketTypes.getTicketTypesByEventId(eventId);
    return result;
  } catch (error) {
    console.log("Error en getTicketTypesByEventId:", error);
    throw new Error("Error en getTicketTypesByEventId");
  }
}
