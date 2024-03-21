import { ValidatorToken } from "@/types/validators";
import { db } from "../prisma";

export async function createValidatorToken(data: ValidatorToken) {
  return await db.validatorToken.create({ data });
}

export async function getTokensByEvent(eventId: string) {
  return await db.validatorToken.findMany({
    where: {
      eventId,
    },
    include: {
      event: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
}
