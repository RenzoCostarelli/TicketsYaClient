import CreateEventDialog from "@/components/create-event-dialog/create-event-dialog-server";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getEventsByUserId } from "@/lib/api/eventos";
import {
  BarChartIcon,
  FileEditIcon,
  KeyIcon,
  Plus,
  TrashIcon,
} from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getUserByEmail } from "@/lib/api/users";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const { id } = await getUserByEmail(session?.user?.email as string);
  const eventos = await getEventsByUserId(id);

  return (
    <div className="flex flex-col items-center gap-8 p-4 md:p-8">
      <nav className="w-full max-w-md flex justify-around mb-8">
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
      </nav>
      <CreateEventDialog />
      <main className="flex flex-col items-center gap-8 p-4 md:p-8">
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
            <>
              <Card className="w-full max-w-md">
                <CardHeader className="flex flex-row items-center gap-2">
                  <img
                    alt="Event thumbnail"
                    className="w-16 h-16 rounded-lg"
                    height="100"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "100/100",
                      objectFit: "cover",
                    }}
                    width="100"
                  />
                  <div className="grid gap-1">
                    <CardTitle>{evento.title}</CardTitle>
                    <CardDescription>{evento.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardFooter className="flex justify-end gap-4">
                  <Button size="icon" variant="ghost">
                    <FileEditIcon className="w-6 h-6" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button size="icon" variant="ghost">
                    <BarChartIcon className="w-6 h-6" />
                    <span className="sr-only">Statistics</span>
                  </Button>
                  <Button size="icon" variant="ghost">
                    <KeyIcon className="w-6 h-6" />
                    <span className="sr-only">Key</span>
                  </Button>
                  <Button className="text-red-500" size="icon" variant="ghost">
                    <TrashIcon className="w-6 h-6" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </CardFooter>
              </Card>
            </>
          ))}
      </main>
    </div>
  );
}
