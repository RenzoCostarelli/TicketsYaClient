import { DashboardCard } from "@/types/card";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChartIcon,
  FileEditIcon,
  KeyIcon,
  TicketIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function EventCard({ evento }: { evento: DashboardCard }) {
  return (
    <>
      <Card className="w-full max-w-xl" key={evento.id}>
        <CardHeader className="flex flex-row items-center gap-2">
          <Image
            src={evento.image || ""}
            alt="text"
            width={100}
            height={100}
            style={{ objectFit: "cover", aspectRatio: 1 }}
          />
          <div className="grid gap-1">
            <CardTitle>{evento.title}</CardTitle>
            <CardDescription>{evento.description}</CardDescription>
          </div>
        </CardHeader>
        <CardFooter className="flex justify-between gap-4">
          <Link href={`dashboard/evento/${evento.id}`}>
            <FileEditIcon className="w-6 h-6" />
            <span className="sr-only">Editar</span>
          </Link>
          <Link href={`dashboard/evento/ticket-types/${evento.id}`}>
            <TicketIcon className="w-6 h-6" />
            <span className="sr-only">Tickets</span>
          </Link>
          <Button size="icon" variant="ghost">
            <BarChartIcon className="w-6 h-6" />
            <span className="sr-only">Estadisticas</span>
          </Button>
          <Button size="icon" variant="ghost">
            <KeyIcon className="w-6 h-6" />
            <span className="sr-only">Key</span>
          </Button>
          <Button className="text-red-500" size="icon" variant="ghost">
            <TrashIcon className="w-6 h-6" />
            <span className="sr-only">Eliminar</span>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
