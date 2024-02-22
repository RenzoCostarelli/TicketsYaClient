import { getOrderById, getTyicketTypeById } from "@/lib/actions";
import Image from "next/image";
import { CalendarIcon, MapPin } from "lucide-react";
import { datesFormater } from "@/lib/utils";
import UserDataForm from "@/components/client-data-form/client-data-form";
import { Order } from "@/types/order";
import OrderTimeOut from "@/components/order-time-out/order-time-out";

export default async function Evento({ params }: { params: { id: string } }) {
  const order = await getOrderById(params.id);
  const ticketType = await getTyicketTypeById(order?.ticketTypeId as string);
  const evento = order?.event;

  const groupedEventDates = datesFormater(evento?.dates as string);
  const groupedTicketDates = datesFormater(ticketType?.dates as string);

  if (order?.status === "EXPIRED") {
    return (
      <section className="w-full py-6 md:py-12">
        <h2 className="text-2xl mb-10 font-bold tracking-tighter sm:text-2xl md:text-3xl text-center">
          Orden vencida
        </h2>
      </section>
    );
  }

  return (
    <>
      <section className="w-full py-6 md:py-12">
        <div className="container grid gap-6 px-4 md:px-6 lg:grid-cols-2 xl:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {evento?.title}
              </h1>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <CalendarIcon className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-medium">{groupedEventDates}</span>
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

      <OrderTimeOut order={order as Order} />
      <section className="w-full py-6 md:py-12">
        <h2 className="text-2xl mb-10 font-bold tracking-tighter sm:text-2xl md:text-3xl text-center">
          Datos de tu orden
        </h2>
        <div className="flex mx-auto align-center justify-center gap-3 flex-col mx-auto max-w-md">
          <div className="flex gap-4 justify-between">
            <div className="item bg-gray-100 p-5 w-full">
              {ticketType?.title} | {groupedTicketDates}
            </div>
            <div className="item bg-gray-100  p-5">{order?.quantity}</div>
          </div>
          <div className="item bg-gray-100  p-5">
            TOTAL: ${ticketType?.price! * order?.quantity!}
          </div>
        </div>
      </section>
      <section className="w-full py-6 md:py-12">
        <h2 className="text-2xl mb-10 font-bold tracking-tighter sm:text-2xl md:text-3xl text-center">
          Tus datos
        </h2>
        <p className="mb-10 bg-gray-100 max-w-md p-10 mx-auto">
          Una vez completados tus datos vas a poder realizar el pago. Vas a
          recibir tus entradas a tu casilla de email
        </p>
        <div className="flex mx-auto align-center justify-center max-w-md bg-gray-100 p-5">
          <UserDataForm order={order as Order} />
        </div>
      </section>
    </>
  );
}
