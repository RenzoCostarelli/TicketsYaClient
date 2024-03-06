export type EventStatus = "DRAFT" | "ACTIVE" | "CONCLUDED" | "DELETED";

export interface Evento {
  id: string;
  title: string;
  description: string;
  location: string;
  address: string;
  userId: string;
  image: string;
  dates: string;
  status: EventStatus;
}

export type ImageState = "UPDATED" | "DELETED" | "EMPTY";