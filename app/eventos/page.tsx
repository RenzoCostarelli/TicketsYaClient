import EventCard from "@/components/event-card/event-card";
import { Evento } from "@/types/event";
import Image from "next/image";

export default async function Eventos() {
  // const { events } = await getData() || {};

  return (
    <main className="p-24">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        PROXIMOS EVENTOS
      </h1>
      {/* {events &&
        events.map((evento: Evento) => (
          <EventCard evento={evento} key={evento.eventId} />
        ))} */}
    </main>
  );
}
