import { db } from "../prisma";

export async function getAllUserConfiguration(userId: string) {
  return await db.userConfiguration.findMany({
    where: {
      userId: userId,
    },
  });
}

export async function createUserConfiguration(userId: string) {
  const data = {
    userId,
  };
  return await db.userConfiguration.create({ data });
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
