import { Evento } from "@/types/event";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { TicketIcon } from "lucide-react";
import Image from "next/image";
import { formatDatesByMonth, groupDatesByMonth } from "@/lib/utils";

export default function EventCard({ evento }: { evento: Evento }) {
  const parsedDates = JSON.parse(evento?.dates as string);
  const groupedMonths = groupDatesByMonth(parsedDates);
  const groupedDates = formatDatesByMonth(groupedMonths);
  return (
    <Link href={`eventos/${evento.id}`}>
      <Card className="rounded-lg shadow-md">
        <div className="aspect-[16/9] relative">
          <Image
            src={evento?.image || ""}
            alt="text"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <CardContent className="p-4 grid gap-2">
          <p className="text-sm uppercase font-medium tracking-wide text-gray-500 dark:text-gray-400">
            {evento.location}
          </p>
          <p className="text-sm font-medium">{groupedDates}</p>

          <CardTitle>{evento.title}</CardTitle>
          <CardDescription>{evento.description}</CardDescription>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 p-4">
          <Button className="w-full">
            <TicketIcon className="h-4 w-4 mr-2" />
            Comprar entradas
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
