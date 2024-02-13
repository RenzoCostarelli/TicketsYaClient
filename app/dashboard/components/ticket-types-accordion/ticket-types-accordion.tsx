"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Evento } from "@/types/event";
import EditTycketTypeForm from "../edit-ticket-type-form/edit-ticket-type-form";

export default function TicketTypeAccordion({
  evento,
  ticketTypes,
}: {
  ticketTypes: TicketType[];
  evento: Evento;
}) {
  return (
    <div className="flex flex-col gap-4 w-[100%]">
      {ticketTypes.length > 0 ? (
        <Accordion collapsible type="single">
          {ticketTypes.map((ticket) => (
            <AccordionItem value={ticket.id} key={ticket.id}>
              <AccordionTrigger>{ticket.title}</AccordionTrigger>
              <AccordionContent>
                <EditTycketTypeForm evento={evento} ticket={ticket} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <h1>No hay tickets creados</h1>
      )}
      {/* Aca va el form para crear uno nuevo*/}
      {/* <TycketTypeForm evento={evento} /> */}
    </div>
  );
}
