export type TicketType = {
  _id: string;
  eventId: string;
  price: number;
  quantity: number;
  date: string;
  type: string;
  ticketsAvailableOnline: number;
  ticketsPurchased: number;
  ticketPurchaseDeadline?: string;
  isActive: boolean;
  isAbono: boolean;
  createdDate: string;
};

export type Evento = {
  id: string;
  title: string;
  description: string;
  location: string;
  userId: string;
  image: string;
  dates: string;
};
