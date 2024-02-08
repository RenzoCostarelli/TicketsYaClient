import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserByEmail } from "@/lib/api/users";
import CreateEventForm from "../components/create-event/create-event-form";

export default async function NewEvent() {
  const session = await getServerSession(authOptions);
  const { id } = await getUserByEmail(session?.user?.email as string);
  return <CreateEventForm userId={id} />;
}
