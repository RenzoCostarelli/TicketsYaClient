"use server";

import * as Eventos from "@/lib/api/eventos";
import * as Orders from "@/lib/api/orders";
import * as TicketTypes from "@/lib/api/ticket-types";
import * as Users from "@/lib/api/users";
import { EventStatus } from "@/types/event";
import { Product } from "@/types/product";
import { TicketType, UpdateTicketTypeType } from "@/types/tickets";
import MercadoPagoConfig, { Preference } from "mercadopago";
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
  try {
    const result = await Orders.updateOrder(orderId, data);
    console.log("Order editada:", result);
    revalidatePath(`/orders/${result.id}`);
  } catch (error) {
    console.log("Error editando la order:", error);
    throw new Error("Error editando la order");
  }
}

export async function updateUser(data: any, userEmail: string) {
  try {
    const result = await Users.updateUser(data, userEmail);
    console.log("Usuario editado:", result);
    revalidatePath(`/dashboard/evento/${result.id}`);
  } catch (error) {
    console.log("Error editando el usuario:", error);
    throw new Error("Error editando el usuario");
  }
}

export async function getMercadoPagoTokenByUser(userId: string) {
  try {
    const result = await Users.getUserById(userId);
    console.log(result);
    return result.mpAccessToken;
  } catch (error) {}
}

export async function getMercadPagoUrl(
  product: any,
  orderData: any,
  orderId: string,
  userId: string
) {
  // Cambiar type de product y ademas pedir la data del form para updatear la order
  console.log(orderData);
  updateOrder(orderData, orderId);
  let preference = null;
  const MP_ACCESS_TOKEN = await getMercadoPagoTokenByUser(userId);
  console.log("token", MP_ACCESS_TOKEN);
  const client = new MercadoPagoConfig({
    accessToken: MP_ACCESS_TOKEN!,
  });

  const siteUrl =
    "https://78b0-2803-9800-98c4-84d9-74f0-4336-1ad8-3044.ngrok-free.app";
  try {
    preference = await new Preference(client).create({
      body: {
        items: [
          {
            // id: `${product.title}-${Math.floor(Math.random() * 100000)}`,
            // title: product.title,
            // unit_price: product.price,
            // quantity: 1,
            id: `id del producto`,
            title: "titulo",
            unit_price: 2000,
            quantity: 1,
          },
        ],
        // external_reference: product.orderId,
        auto_return: "approved",
        back_urls: {
          success: `${siteUrl}/`,
          failure: `${siteUrl}/`,
        },
        notification_url: `${siteUrl}/api/mp-notify`,
      },
    });
  } catch (error) {
    console.error("error", error);
  }

  if (preference) {
    redirect(preference.sandbox_init_point!);
  }
  // try {
  //   const result = await fetch("http://localhost:3000/api/mercado-pago", {
  //     method: "POST",
  //     body: JSON.stringify({ product }),
  //   });
  //   console.log("result", result);
  // } catch (error) {
  //   console.log(error);
  // }
}
