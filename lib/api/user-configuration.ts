import { db } from "../prisma";

export async function getAllUserConfiguration(userId: string) {
  return await db.userConfiguration.findMany({
    where: {
      userId: userId,
    },
  });
}

export async function updateUserConfiguration(
  configData: Partial<UserConfiguration>,
  configId: string
) {
  return await db.userConfiguration.update({
    data: configData,
    where: {
      id: configId,
    },
  });
}
