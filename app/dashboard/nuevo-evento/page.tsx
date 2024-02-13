import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserByEmail } from "@/lib/api/users";
import CreateEventForm from "../components/create-event/create-event-form";

export default async function NewEvent() {
  const session = await getServerSession(authOptions);
  const { id } = await getUserByEmail(session?.user?.email as string);
  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Nuevo evento
      </h1>
      <CreateEventForm userId={id} />;
    </>
  );
}
