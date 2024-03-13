import { db } from "../prisma";

export async function getAllNotifications(userId: string) {
  return await db.notification.findMany({
    where: {
      userId: userId,
    },
  });
}
