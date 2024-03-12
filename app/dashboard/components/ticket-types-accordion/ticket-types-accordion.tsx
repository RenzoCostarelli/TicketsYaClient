"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Evento } from "@/types/event";
import EditTycketTypeForm from "../edit-ticket-type-form/edit-ticket-type-form";
import { TicketType } from "@/types/tickets";
import TycketTypeForm from "../ticket-type-form/ticket-type-form";

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
            <AccordionItem value={ticket.id as string} key={ticket.id}>
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
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Nuevo tipo de ticket
      </h2>
      <TycketTypeForm evento={evento} />
    </div>
  );
}
