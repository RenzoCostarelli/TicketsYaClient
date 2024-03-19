"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { updateUserConfiguration } from "@/lib/actions";

const FormSchema = z.object({
  eventSoldOutNotification: z.boolean().default(false).optional(),
  ticketTypeSoldOutNotification: z.boolean().default(false).optional(),
  eventToBeSoldOutNotification: z.boolean().default(false).optional(),
  ticketTypePublishedNotification: z.boolean().default(false).optional(),
});

export default function NotificationsForm({
  configuration,
}: {
  configuration: UserConfiguration[];
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      eventSoldOutNotification: configuration[0].eventSoldOutNotification,
      ticketTypeSoldOutNotification:
        configuration[0].ticketTypeSoldOutNotification,
      eventToBeSoldOutNotification:
        configuration[0].eventToBeSoldOutNotification,
      ticketTypePublishedNotification:
        configuration[0].ticketTypePublishedNotification,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      updateUserConfiguration(data, configuration[0].id as string);
      toast({
        title: "Preferencias de notifiaciónes actualizadas",
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="eventSoldOutNotification"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Evento con entradas agotadas</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ticketTypeSoldOutNotification"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Evento a punto de agotarse</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="eventToBeSoldOutNotification"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Tipo de entradas agotadas</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ticketTypePublishedNotification"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Tipo de entradas a punto de agotarse</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">Guardar</Button>
      </form>
    </Form>
  );
}
