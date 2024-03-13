//import CreateEventDialog from "@/components/create-event-dialog/create-event-dialog-server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getEventsByUserId } from "@/lib/api/eventos";
import { Plus } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getUserByEmail } from "@/lib/api/users";
import EventCard from "./components/event-card/event-card";
import { Evento } from "@/types/event";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const { id } = await getUserByEmail(session?.user?.email as string);
  const eventos = await getEventsByUserId(id);

  return (
    <>
      <Button asChild variant="secondary">
        <Link href={"/dashboard/nuevo-evento"}>
          <Plus className="mr-2" /> Nuevo evento
        </Link>
      </Button>
      <div className="flex flex-col items-center gap-8 p-4 md:p-8">
        <div className="flex">
          <Input type="text" placeholder="Buscar evento" />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Fecha asc</SelectItem>
              <SelectItem value="dark">Fecha desc</SelectItem>
              <SelectItem value="dark">Titulo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {eventos &&
          eventos.map((evento) => (
            <EventCard evento={evento as Evento} key={evento.id} />
          ))}
      </div>
    </>
  );
}
