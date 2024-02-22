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
import { DashboardCard } from "@/types/card";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const { id } = await getUserByEmail(session?.user?.email as string);
  const eventos = await getEventsByUserId(id);
  
  return (
    <>
      {/* <nav className="w-full max-w-md flex justify-around mb-8">
        <Link
          className="text-lg font-semibold text-gray-700 hover:text-gray-900"
          href="#"
        >
          Eventos
        </Link>
        <Link
          className="text-lg font-semibold text-gray-700 hover:text-gray-900"
          href="#"
        >
          Tipos de entradas
        </Link>
        <Link
          className="text-lg font-semibold text-gray-700 hover:text-gray-900"
          href="#"
        >
          Estadisticas
        </Link>
        <Link
          className="text-lg font-semibold text-gray-700 hover:text-gray-900"
          href="#"
        >
          Perfil
        </Link>
      </nav> */}
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
          eventos.map((evento: DashboardCard) => (
            <EventCard evento={evento} key={evento.id} />
          ))}
      </div>
    </>
  );
}
