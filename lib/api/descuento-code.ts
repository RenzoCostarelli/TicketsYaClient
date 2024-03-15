import { DiscountCode } from "@/types/discount-code";
import { db } from "../prisma";

export async function getDiscountCodeByUserId(userId: string) {
  return await db.discountCode.findMany({
    where: {
      status: {
        not: "DELETED"
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getAllDiscountCode() {
  return await db.discountCode.findMany({
    where: {
      status: {
        not: "DELETED"
      },
    }
  });
}

export async function createDiscountCode(data: DiscountCode) {
  return await db.discountCode.create({ data });
}

export async function updateDiscountCode(eventId: string, eventData: Partial<DiscountCode>) {
  return await db.discountCode.update({
    where: {
      id: eventId,
    },
    data: eventData,
  });
}

export async function getDiscountCodeById(eventId: string) {
  return await db.discountCode.findUnique({
    where: {
      id: eventId,
    },
  });
}
