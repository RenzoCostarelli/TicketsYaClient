import EventCard from '@/components/event-card/event-card';
import { Evento } from '@/types/event';
import Image from 'next/image'

async function getData() {
  const res = await fetch(`${process.env.apiUrl}/events/`, {cache: 'no-store'});
  if (!res.ok) {
    throw new Error('Failed to fetch home data');
  }
  return res.json();
}

export default async function Home() {
  const { events } = await getData() || {};

  return (
    <main className="p-24">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        PROXIMOS EVENTOS
      </h1>
      {events && events.map((evento: Evento) => (
        <EventCard evento={evento} key={evento.eventId}/>
      ))}      
    </main>
  )
}
