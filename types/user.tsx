export type User = {
  id?: string;
  name?: string | null;
  email?: string | null;
  emailVerified?: Date | null;
  image?: string | null;
  mpAccessToken?: string | null;
  mpPublicKey?: string | null;
};
