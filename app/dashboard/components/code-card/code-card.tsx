"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FileEditIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { deleteDiscountCode, getEventById } from "@/lib/actions";
import { toast } from "@/components/ui/use-toast";
import { DiscountCode } from "@/types/discount-code";
import { format } from "date-fns";
import { useEffect, useState } from "react";

export default function CodeCard({
  discountCode,
}: {
  discountCode: DiscountCode,
}) {
  
  const getEventTitle = async (eventId: string) => {
    const evento = await getEventById(eventId);    
    return evento?.title || '';
  };

  const [eventTitle, setEventTitle] = useState<string>("");

  useEffect(() => {
    getEventTitle(discountCode.eventId as string)
      .then(title => setEventTitle(title))
      .catch(error => console.error("Error obteniendo el título del evento:", error));
  }, [discountCode.eventId]);
  
  const handleDeleteCode = () => {
    deleteDiscountCode(discountCode.id as string)
      .then(() => {
        toast({
          title: "Código borrado!",
        });
      })
      .catch((error: string) => {
        console.log("error editando el evento", error);
        toast({
          variant: "destructive",
          title: "Error editando el evento",
        });
      });
  };

  return (
    <>
      <Card className="w-full max-w-xl" key={ discountCode.id }>
        <CardHeader className="flex flex-row items-center gap-2">
          <div className="grid gap-1">
            <CardTitle>Código de descuento</CardTitle>
            <CardDescription>{ discountCode.code }</CardDescription>
            <CardDescription>Evento: { eventTitle }</CardDescription>
            <CardDescription>
              Expira: {format(discountCode.expiresAt, "dd/MM/yyyy")}
            </CardDescription>
          </div>
        </CardHeader>
        <CardFooter className="flex justify-start gap-4">
          <Link href={`/dashboard/codigos/${discountCode.id}`}>
            <FileEditIcon className="w-6 h-6" />
            <span className="sr-only">Editar</span>
          </Link>
          <Button
            className="text-red-500"
            size="icon"
            variant="ghost"
            onClick={handleDeleteCode}
          >
            <TrashIcon className="w-6 h-6" />
            <span className="sr-only"> Eliminar </span>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
