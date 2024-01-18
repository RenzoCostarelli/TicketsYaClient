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
    eventType: string;
    ticketsAvailableOnline: number;
    hasLimitedPlaces: boolean;
    title: string;
    description: string;
    address: string;
    dates: string[]; // You might want to replace this with a more specific date type
    price: number;
    purchasedTicketsList: string[];
    ticketsTypeList: TicketType[];
    ticketsPurchased: number;
    image: string;
    createdDate: string;
    eventId: string;
  };