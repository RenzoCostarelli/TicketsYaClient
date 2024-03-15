"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChartIcon,
  FileEditIcon,
  KeyIcon,
  TicketIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { deleteEvent } from "@/lib/actions";
import { toast } from "@/components/ui/use-toast";
import { DiscountCode } from "@/types/discount-code";

export default function CodeCard({ discountCode }: { discountCode: DiscountCode }) {
  const handleDeleteEvent = () => {
    deleteEvent(discountCode.id)
      .then(() => {
        toast({
          title: "Evento borrado!",
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
      <Card className="w-full max-w-xl" key={discountCode.id}>
        <CardHeader className="flex flex-row items-center gap-2">          
          <div className="grid gap-1">
            <CardTitle>{discountCode.code}</CardTitle>
           {/* <CardDescription>{discountCode.description}</CardDescription>*/}
          </div>discountCode
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
            onClick={handleDeleteEvent}
          >
            <TrashIcon className="w-6 h-6" />
            <span className="sr-only"> Eliminar </span>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
