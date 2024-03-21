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
    include: {
      event: {
        select: {
          title: true
        }
      }
    }
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

export async function updateDiscountCode(codeId: string, codeData: Partial<DiscountCode>) {
  return await db.discountCode.update({
    where: {
      id: codeId,
    },
    data: codeData,
  });
}

export async function getDiscountCodeById(codeId: string) {
  return await db.discountCode.findUnique({
    where: {
      id: codeId,
    },
  });
}
