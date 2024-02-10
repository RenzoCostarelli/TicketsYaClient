import { getEventById } from "@/lib/actions";
import EditEventForm from "../../components/edit-event-form/edit-event-form";
import { Evento } from "@/types/event";

export default async function EditEvent({
  params,
}: {
  params: { id: string };
}) {
  const evento = await getEventById(params.id);
  return <EditEventForm evento={evento as Evento} />;
}
