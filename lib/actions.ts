"use server";

import * as Eventos from "@/lib/api/eventos";
import { revalidatePath } from "next/cache";
// Type temporal
export type Evento = {
  title: string;
  description: string;
  location: string;
  userId: string;
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
