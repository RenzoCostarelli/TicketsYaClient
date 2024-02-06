import EventCard from "@/components/event-card/event-card";
import { getAllEvents } from "@/lib/api/eventos";
import { Evento } from "@/types/event";
import Image from "next/image";

export default async function Home() {
  const eventos = await getAllEvents();

  return (
    <main className="p-24">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        PROXIMOS EVENTOS
      </h1>
      {eventos &&
        eventos.map((evento: any) => (
          <EventCard evento={evento} key={evento.id} />
        ))}
    </main>
  );
}
