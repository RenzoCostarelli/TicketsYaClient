"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { createOrder } from "@/lib/actions";

export type TicketType = {
  id: string;
  title: string;
  date: Date | null;
  time: string | null;
  price: number;
  eventId: string;
  status: string;
  type: string;
  startDate: Date | null;
  endDate: Date;
  quantity: number;
  position: number;
  dates: { id: number; date: string }[];
  createdAt: Date;
  updatedAt: Date;
};

const FormSchema = z.object({
  ticketType: z.string({
    required_error: "Por favor selecciona un tipo de ticket.",
  }),
});

export default function TicketTypePicker({ tickets }: { tickets: any }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("data", data);
    createOrder(data.ticketType)
      .then(() => {
        form.reset();
        alert("Order creada");
      })
      .catch((error) => {
        console.log("error creando order", error);
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="ticketType"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo de ticket" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {tickets.map((ticket: any) => (
                    <SelectItem value={ticket.id} key={ticket.id}>
                      {ticket.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Comprar</Button>
      </form>
    </Form>
  );
}
