"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateEvent } from "@/lib/actions";
import { useState } from "react";
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
import { Evento, ImageState } from "@/types/event";
import { cn, useUploadThing, deleteImage } from "@/lib/utils";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { FileUploader } from "../file-uploader/file-uploader";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "El titulo debe tener al menos 5 caracteres.",
  }),
  description: z.string(),
  location: z.string(),
  address: z.string(),
  image: z.string(),
  file: z.any(),
});

export default function EditEventForm({ evento }: { evento: Evento }) {
  const parsedDates = JSON.parse(evento.dates);
  const [dateTimeSelections, setDateTimeSelections] = useState(parsedDates);
  const [files, setFiles] = useState<File[]>([]);
  const [fileStatus, setFileStatus] = useState<ImageState>("EMPTY");

  const { toast } = useToast();

  const { startUpload } = useUploadThing("profileImage");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: evento.title,
      description: evento.description,
      location: evento.location,
      address: evento.address,
      image: evento.image,
      file: evento.image,
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

  const updateDataEvent = (values: Evento) => {
    const { id, ...props } = values;

    updateEvent({ ...props }, id)
      .then(() => {
        toast({
          title: "Evento editado!",
        });
      })
      .catch((error) => {
        console.log("error editando el evento", error);
        toast({
          variant: "destructive",
          title: "Error editando el evento",
        });
      });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const parsedDates = JSON.stringify(dateTimeSelections);

    if (fileStatus === "UPDATED") {
      const uploadedImages = await startUpload(files);
      if (uploadedImages) {
        deleteImage(evento.image);
        values.image = uploadedImages[0].url;
      }
    }
    
    if(fileStatus === "DELETED") {
      values.image = "https://placehold.co/600x400/EEE/31343C";
    }

    updateDataEvent({
      title: values.title,
      description: values.description,
      location: values.location,
      address: values.address,
      image: values.image,
      dates: parsedDates,
      userId: evento.userId,
      status: "ACTIVE",
      id: evento.id,
    });

  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => onSubmit(values))}
          className="space-y-8 w-[100%]"
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
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                  <Input placeholder="Dirección del evento" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Label>Fechas</Label>
          <DatesPicker
            dateTimeSelections={dateTimeSelections}
            onAddDateTime={handleAddDateTime}
            onRemoveDateTime={handleRemoveDateTime}
            onDateChange={handleDateChange}
          />
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagen</FormLabel>
                <FormControl>
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles} 
                    setFileStatus={setFileStatus}                  
                    />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Guardar evento</Button>
          <Link href={`/dashboard/evento/ticket-types/${evento.id}`}>
            Tipo de tickets
          </Link>
        </form>
      </Form>
    </>
  );
}
