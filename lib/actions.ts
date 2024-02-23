"use server";

import * as Eventos from "@/lib/api/eventos";
import * as Orders from "@/lib/api/orders";
import * as TicketTypes from "@/lib/api/ticket-types";
import { EventStatus } from "@/types/event";
import { TicketType, UpdateTicketTypeType } from "@/types/tickets";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// Type temporal
export type Evento = {
  title: string;
  description: string;
  address: string;
  location: string;
  userId: string;
  image: string;
  dates: string;
  status: EventStatus;
};

export async function createEvent(data: Evento) {
  let eventId = null;
  try {
    const result = await Eventos.createEvent(data);
    console.log("Evento creado:", result);
    eventId = result.id;
  } catch (error) {
    console.log("Error creando el evento:", error);
    throw new Error("Error creando el evento");
  }
  if (eventId) {
    redirect(`/dashboard/evento/${eventId}`);
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

export async function deleteEvent(eventId: string) {
  try {
    const data = { status : "DELETED"}
    const result = await Eventos.updateEvent(eventId, data as Evento);

    revalidatePath(`/dashboard`);
    return result;
  } catch (error) {
    console.log("Error borrando el evento:", error);
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

export async function getTyicketTypeById(ticketTypeId: string) {
  try {
    const result = await TicketTypes.getTicketTypesById(ticketTypeId);
    return result;
  } catch (error) {
    console.log("Error en getTicketTypesByEventId:", error);
    throw new Error("Error en getTicketTypesByEventId");
  }
}

export async function createTicketType(data: TicketType) {
  try {
    const result = await TicketTypes.createTicketType(data);
    console.log("TicketType creado:", result);
  } catch (error) {
    console.log("Error creando el TicketType:", error);
    throw new Error("Error creando el TicketType");
  }

  revalidatePath("/dashboard");
}

export async function updateTicketType(
  data: UpdateTicketTypeType,
  ticketId: string
) {
  try {
    const result = await TicketTypes.updateTicketType(ticketId, data);
    console.log("Tipo de ticket editado:", result);
    revalidatePath(`/dashboard/evento/${result.id}`);
  } catch (error) {
    console.log("Error editando el tipo de ticket:", error);
  }
}
type CreateOrderType = {
  ticketTypeId: string;
  status: string;
  quantity: number;
  eventId: string;
};

export async function createOrder(data: CreateOrderType) {
  console.log("ticketid", data.ticketTypeId);
  let orderId = null;
  try {
    const result = await Orders.createOrder(data);
    console.log("Order creada:", result);
    orderId = result.id;
  } catch (error) {
    console.log("Error creando la order:", error);
    throw new Error("Error creando la order");
  }
  if (orderId) {
    redirect(`/orders/${orderId}`);
  }

  revalidatePath("/dashboard");
}

export async function getOrderById(orderId: string) {
  try {
    const result = await Orders.getOrderById(orderId);
    return result;
  } catch (error) {
    console.log("Error en getEventById:", error);
    throw new Error("Error o");
  }
}

export async function updateOrder(data: any, orderId: string) {
  console.log("data");
  try {
    const result = await Orders.updateOrder(orderId, data);
    console.log("Order editada:", result);
    revalidatePath(`/orders/${result.id}`);
  } catch (error) {
    console.log("Error editando la order:", error);
    throw new Error("Error editando la order");
  }
}
