export type GlobalStatus = "DRAFT" | "ACTIVE" | "CONCLUDED" | "DELETED";

export interface DiscountCode {
  id?: string;
  eventId?: string;
  ticketTypeId?: string;
  code: string;
  expiresAt: Date;
  status: GlobalStatus;
}
