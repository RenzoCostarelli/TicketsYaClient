import { db } from "../prisma";

export async function getUserByEmail(email: string) {
  return await db.user.findFirstOrThrow({
    where: {
      email,
    },
  });
}
