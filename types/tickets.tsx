type TicketTypeStatus = "ACTIVE" | "INACTIVE" | "ENDED" | "REMOVED";

type TicketTypes = "NORMAL" | "ABONO" | "PROMO";

interface TicketType {
  id: string;
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
  createdAt: Date;
  updatedAt: Date;
}
