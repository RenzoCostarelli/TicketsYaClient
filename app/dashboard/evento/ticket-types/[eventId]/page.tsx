import { getEventById, getTicketTypesByEventId } from "@/lib/actions";
import EditEventForm from "../../../components/edit-event-form/edit-event-form";
import { Evento } from "@/types/event";
import TicketTypeAccordion from "@/app/dashboard/components/ticket-types-accordion/ticket-types-accordion";

export default async function TicketType({
  params,
}: {
  params: { eventId: string };
}) {
  // get ticket types by eventId
  const evento = await getEventById(params.eventId);
  const eventTicketTypes = await getTicketTypesByEventId(params.eventId);

  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Tipos de tickets
      </h1>
      <TicketTypeAccordion
        ticketTypes={eventTicketTypes}
        evento={evento as Evento}
      />
    </>
  );
}
