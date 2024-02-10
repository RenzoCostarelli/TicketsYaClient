"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createEvent, updateEvent } from "@/lib/actions";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import DatesPicker from "@/components/dates-picker/dates-picker";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Evento } from "@/types/event";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DollarSign, TicketIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "El titulo debe tener al menos 5 caracteres.",
  }),
  description: z.string(),
  location: z.string(),
  imageUrl: z.string(),
});

export default function EditEventForm({ evento }: { evento: Evento }) {
  const parsedDates = JSON.parse(evento.dates);
  const [dateTimeSelections, setDateTimeSelections] = useState(parsedDates);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: evento.title,
      description: evento.description,
      location: evento.description,
      imageUrl: evento.image,
    },
  });

  const handleAddDateTime = () => {
    const newSelection = {
      id: dateTimeSelections.length,
      date: new Date().toISOString().slice(0, 16),
    };
    setDateTimeSelections([...dateTimeSelections, newSelection]);
  };

  const handleRemoveDateTime = (id: number) => {
    setDateTimeSelections(
      dateTimeSelections.filter((selection: any) => selection.id !== id)
    );
  };

  const handleDateChange = (date: string, id: number) => {
    const updatedSelections = dateTimeSelections.map((selection: any) => {
      if (selection.id === id) {
        return { ...selection, date: date };
      }
      return selection;
    });
    setDateTimeSelections(updatedSelections);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const parsedDates = JSON.stringify(dateTimeSelections);

    updateEvent(
      {
        title: values.title,
        description: values.description,
        location: values.location,
        image: values.imageUrl,
        dates: parsedDates,
        userId: evento.userId,
      },
      evento.id
    )
      .then(() => {
        form.reset();
        alert("Evento editado");
      })
      .catch((error) => {
        console.log("error editando el evento", error);
      });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => onSubmit(values))}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titulo</FormLabel>
              <FormControl>
                <Input placeholder="Titulo del evento" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea placeholder="Descripción del evento" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ubicación</FormLabel>
              <FormControl>
                <Input placeholder="ubicación del evento" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <DatesPicker
          dateTimeSelections={dateTimeSelections}
          onAddDateTime={handleAddDateTime}
          onRemoveDateTime={handleRemoveDateTime}
          onDateChange={handleDateChange}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagen</FormLabel>
              <FormControl>
                <Input placeholder="imagen del evento" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Guardar evento</Button>
        <TicketTypesDialog eventId={evento.id} dates={parsedDates} />
      </form>
    </Form>
  );
}

const ticketsFormSchema = z.object({
  selectedDates: z
    .array(z.number())
    .min(1, "Debes seleccionar al menos una fecha."),
  title: z.string(),
  price: z.number(),
});

function TicketTypesDialog({
  eventId,
  dates,
}: {
  eventId: string;
  dates: any;
}) {
  const form = useForm<z.infer<typeof ticketsFormSchema>>({
    resolver: zodResolver(ticketsFormSchema),
    defaultValues: {
      selectedDates: dates,
      title: "",
      price: 0,
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <TicketIcon /> Tickets
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Datos del evento</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={() => console.log("yep")} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titulo</FormLabel>
                  <FormControl>
                    <Input placeholder="Titulo del evento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="selectedDates"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Fechas</FormLabel>
                  </div>
                  {dates.map((date: any) => {
                    const dateObject = new Date(date.date);
                    const arDate = new Intl.DateTimeFormat("es-AR", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(dateObject);
                    return (
                      <FormField
                        key={date.id}
                        control={form.control}
                        name="selectedDates"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={date.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(date.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          date.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== date.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {arDate}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    );
                  })}
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Guardar ticket</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
