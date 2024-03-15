"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateDiscountCode } from "@/lib/actions";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import DatesPicker from "@/components/dates-picker/dates-picker";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { cn, useUploadThing } from "@/lib/utils";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

import { CalendarIcon, Loader2 } from "lucide-react";
import { DiscountCode } from "@/types/discount-code";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const formSchema = z.object({
  code: z.string().min(5, {
    message: "El titulo debe tener al menos 5 caracteres.",
  }),
  expiresAt: z.date(),
  status: z.enum(["DRAFT", "ACTIVE", "CONCLUDED", "DELETED"]),
  //.refine((file) => file?.length == 1, "File is required."),
});

export default function EditCodeForm({
  discountCode,
}: {
  discountCode: DiscountCode;
}) {
  console.log(discountCode);

  //const parsedDates = JSON.parse(discountCode.expiresAt);
  const [dateTimeSelections, setDateTimeSelections] = useState(
    discountCode.expiresAt
  );
  const [files, setFiles] = useState<File[]>([]);
  const [deleteImageValue, setDeleteImageValue] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const { startUpload } = useUploadThing("profileImage");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: discountCode.code,
      expiresAt: discountCode.expiresAt,
      status: discountCode.status,
    },
  });
/*
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
  };*/

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const parsedDates = JSON.stringify(dateTimeSelections);
    setIsLoading(true);

    updateDiscountCode(
      {
        code: values.code,
        expiresAt: new Date(dateTimeSelections),
        status: "ACTIVE",
      },
      discountCode.id as string
    )
      .then(() => {
        toast({
          title: "Evento editado!",
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error editando el evento", error);
        toast({
          variant: "destructive",
          title: "Error editando el evento",
        });
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
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código</FormLabel>
                <FormControl>
                  <Input placeholder="Titulo del evento" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expiresAt"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Guardar evento"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
