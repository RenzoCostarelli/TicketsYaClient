interface EmailNotification {
  id: string;
  userId: string;
  eventSoldOut: boolean;
  ticketTypeSoldOut: boolean;
  eventToBeSoldOut: boolean;
  ticketTypePublished: boolean;
}
