import { Evento } from "./event";
import { TicketType } from "./tickets";

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
  ticketType?: TicketType;
  quantity?: number;
}
