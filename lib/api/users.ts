import { db } from "../prisma";

export async function getUserByEmail(email: string) {
  return await db.user.findFirstOrThrow({
    where: {
      email,
    },
  });
}

export async function getUserById(userId: string) {
  return await db.user.findFirstOrThrow({
    where: {
      id: userId,
    },
  });
}

export async function updateUser(data: any, email: string) {
  const { id } = await getUserByEmail(email as string);
  return await db.user.update({
    where: {
      id,
    },
    data,
  });
}
