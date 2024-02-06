import { Evento } from "@/types/event";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";

export default function EventCard({ evento }: { evento: any }) {
  return (
    <Link href={`eventos/${evento.id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{evento.title}</CardTitle>
          <CardDescription>{evento.id}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
