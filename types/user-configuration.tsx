interface UserConfiguration {
  id: string;
  userId: string;
  mpAccessToken: string | null;
  eventSoldOutNotification: boolean;
  ticketTypeSoldOutNotification: boolean;
  eventToBeSoldOutNotification: boolean;
  ticketTypePublishedNotification: boolean;
}
