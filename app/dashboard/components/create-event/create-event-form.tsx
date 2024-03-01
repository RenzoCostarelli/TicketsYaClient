"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createEvent } from "@/lib/actions";
import { useEffect, useState } from "react";
import Autocomplete from "react-google-autocomplete";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
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
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

import { FileUploader } from "@/app/dashboard/components/file-uploader/file-uploader";
import { useUploadThing } from "@/lib/utils";
import { Evento } from "@/types/event";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "El titulo debe tener al menos 5 caracteres.",
  }),
  description: z.string(),
  location: z.string(),
  address: z.string(),
  file: z.any(),
  image: z.string(),
  //.refine((file) => file?.length == 1, "File is required."),
});

export default function CreateEventForm({ userId }: { userId: string }) {
  const [dateTimeSelections, setDateTimeSelections] = useState([
    { id: 0, date: new Date().toISOString().slice(0, 16) },
  ]);
  const [files, setFiles] = useState<File[]>([]);

  const { startUpload } = useUploadThing("profileImage");

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      address: "",
      file: "",
      image: "https://placehold.co/600x400/EEE/31343C",
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
      dateTimeSelections.filter((selection) => selection.id !== id)
    );
  };

  const handleDateChange = (date: string, id: number) => {
    const updatedSelections = dateTimeSelections.map((selection) => {
      if (selection.id === id) {
        return { ...selection, date: date };
      }
      return selection;
    });
    setDateTimeSelections(updatedSelections);
  };

  const createDataEvent = (values: Evento) => {
    const {...props } = values;

    createEvent({...props})
      .then(() => {
        form.reset();
        toast({
          title: "Evento creado!",
        });
      })
      .catch((error) => {
        console.log("error creando evento", error);
        toast({
          variant: "destructive",
          title: "error creando evento",
        });
      });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const parsedDates = JSON.stringify(dateTimeSelections);
    let uploadedImagesUrl: string = "";

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);
      if (!uploadedImages) {
        return;
      }
      uploadedImagesUrl = uploadedImages[0].url;

      createDataEvent({
        title: values.title,
        description: values.description,
        location: values.location,
        address: values.address,
        image: uploadedImagesUrl,
        dates: parsedDates,
        userId: userId,
        status: "ACTIVE",
        id: "",
      });
    }
  }

  return (
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
              <FormLabel>Lugar</FormLabel>
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
                <Input placeholder="ubicación del evento" {...field} />
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Guardar evento</Button>
      </form>
    </Form>
  );
}
