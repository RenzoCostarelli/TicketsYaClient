import { getServerSession } from "next-auth";
import NotificationsForm from "../../components/notifications-form/notifications-form";
import { getUserByEmail } from "@/lib/api/users";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getAllUserConfiguration } from "@/lib/actions";

export default async function Notificaciones() {
  const session = await getServerSession(authOptions);
  const { id } = await getUserByEmail(session?.user?.email as string);
  const userConfiguration = (await getAllUserConfiguration(id)) || [];
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Notificaciones
      </h1>
      <p className="text-muted-foreground">
        Elegí que notificaciones recibir en tu e-mail.
      </p>
      <NotificationsForm configuration={userConfiguration} />
    </div>
  );
}
