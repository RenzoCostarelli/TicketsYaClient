import EventCard from "@/components/event-card/event-card";
import { getAllEvents } from "@/lib/api/eventos";

export default async function Home() {
  const eventos = await getAllEvents();

  return (
    <section>
      <h1 className="mb-14 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        PROXIMOS EVENTOS
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        {eventos &&
          eventos.map((evento: any) => (
            <EventCard evento={evento} key={evento.id} />
          ))}
      </div>
    </section>
  );
}
