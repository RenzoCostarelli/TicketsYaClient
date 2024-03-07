import { getEventById } from "@/lib/actions";
import Image from "next/image";
import { CalendarIcon, MapPin } from "lucide-react";
import { datesFormater } from "@/lib/utils";
import TicketTypePicker from "@/components/ticket-type-picker/ticket-type-picker";

export default async function Evento({ params }: { params: { id: string } }) {
  const evento = await getEventById(params.id);

  const groupedDates = datesFormater(evento?.dates as string);
  return (
    <>
      <section className="w-full py-6 md:py-12 bg-gray-50">
        <div className="max-w-2xl container grid gap-6 px-4 md:px-6 grid-cols-2 xl:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {evento?.title}
              </h1>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <CalendarIcon className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-medium">{groupedDates}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-medium">{evento?.location}</span>
              </div>
            </div>
            <div className="max-w-[700px] text-base/relaxed">
              <p>{evento?.description}</p>
            </div>
          </div>
          <div className="aspect-[16/9] relative">
            <Image
              src={evento?.image || ""}
              alt="text"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>
      <section className="w-full py-6 md:py-12">
        <h2 className="text-2xl mb-10 font-bold tracking-tighter sm:text-2xl md:text-3xl text-center">
          Selecciona el tipo de entrada
        </h2>
        <div className="flex mx-auto align-center justify-center">
          {evento?.ticketTypes && (
            <TicketTypePicker
              tickets={evento?.ticketTypes}
              eventId={evento?.id}
            />
          )}
        </div>
      </section>
    </>
  );
}
