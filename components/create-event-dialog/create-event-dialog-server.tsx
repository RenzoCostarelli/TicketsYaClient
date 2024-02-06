import { getServerSession } from "next-auth";
import CreateEventDialogClient from "./create-event-dialog-client";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserByEmail } from "@/lib/api/users";

export default async function CreateEventDialog() {
  const session = await getServerSession(authOptions);
  const { id } = await getUserByEmail(session?.user?.email as string);

  return <CreateEventDialogClient userId={id} />;
}
