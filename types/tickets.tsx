type TicketTypeStatus = "ACTIVE" | "INACTIVE" | "ENDED" | "DELETED";

type TicketTypes = "NORMAL" | "ABONO" | "PROMO";

export interface TicketType {
  id?: string;
  title: string;
  date?: Date | null;
  time?: string | null;
  price: number;
  eventId: string;
  status: TicketTypeStatus;
  type: TicketTypes;
  startDate?: Date | null;
  endDate?: Date | null;
  quantity: number;
  position: number;
  dates?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

// LOL
export type UpdateTicketTypeType = {
  dates: string;
  title: string;
  price: number;
  quantity: number;
  status: TicketTypeStatus;
  // startDate: z.date(),
  endDate: Date | undefined;
};

export type DatesType = {
  id: number;
  date: string;
};

export type TicketOrderType = {
  name: string;
  lastName: string;
  dni: string;
  email: string;
  code: string;
  date: Date;
  orderId: string;
  eventId: string;
  status: "NOT_VALIDATED" | "VALIDATED";
};
