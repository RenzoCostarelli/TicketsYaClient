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
import { datesFormater } from "@/lib/utils";

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
  quantity: z.string(),
});

export default function TicketTypePicker({
  tickets,
  eventId,
}: {
  tickets: any;
  eventId: string;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("data", data);
    const orderData = {
      ticketTypeId: data.ticketType,
      status: "PENDING",
      quantity: parseInt(data.quantity),
      eventId: eventId,
    };
    createOrder(orderData)
      .then(() => {
        form.reset();
      })
      .catch((error) => {
        console.log("error creando order", error);
      });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-1/2 space-y-6 p-3 bg-gray-100"
      >
        <div className="flex gap-2">
          <div className="w-full">
            <FormField
              control={form.control}
              name="ticketType"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo de ticket" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tickets.map((ticket: any) => (
                        <SelectItem value={ticket.id} key={ticket.id}>
                          {ticket.title} | {datesFormater(ticket.dates)} | $
                          {ticket.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="0" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="7">7</SelectItem>
                    <SelectItem value="8">8</SelectItem>
                    <SelectItem value="9">9</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full" type="submit">
          Comprar
        </Button>
      </form>
    </Form>
  );
}
