import { Evento } from "./event";

export interface Order {
  id?: string;
  fullName?: string;
  dni?: string;
  email?: string;
  phone?: string;
  status: string;
  ticketTypeId: string;
  eventId: string;
  createdAt: Date;
  event?: Evento;
}
