"use client";
import { CalendarIcon, Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { createEvent } from "@/lib/actions";
import { useState } from "react";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "El titulo debe tener al menos 5 caracteres.",
  }),
  description: z.string(),
  // date: z.date(),
  location: z.string(),
});

export default function CreateEventDialogClient({
  userId,
}: {
  userId: string;
}) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      // date: undefined,
      location: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createEvent({
      title: values.title,
      description: values.description,
      location: values.location,
      userId: userId,
    })
      .then(() => form.reset())
      .finally(() => setDialogOpen(false));
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(!dialogOpen)}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus /> Nuevo evento
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Datos del evento</DialogTitle>
          <DialogDescription>USERID = {userId}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    <Input placeholder="descripción del evento" {...field} />
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

            <DialogFooter>
              <Button type="submit">Guardar evento</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
