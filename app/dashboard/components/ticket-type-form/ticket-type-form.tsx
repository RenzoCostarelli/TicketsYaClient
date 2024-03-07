"use client";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Evento } from "@/types/event";
import { createTicketType, updateTicketType } from "@/lib/actions";
import { DatesType, TicketType, UpdateTicketTypeType } from "@/types/tickets";
import { randomUUID } from "crypto";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const FormSchema = z.object({
  selectedDates: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "Debes seleccionar al menos una fecha",
    }),
  title: z.string(),
  price: z.number(),
  quantity: z.number(),
  isFree: z.boolean(),
  status: z.enum(["ACTIVE", "INACTIVE", "ENDED", "DELETED"]),
  // startDate: z.date(),
  endDate: z.date().optional(),
});

export default function TycketTypeForm({ evento }: { evento: Evento }) {
  const { toast } = useToast();
  const parsedEventDates = JSON.parse(evento.dates);
  const [isFree, setIsFree] = useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      selectedDates: [],
      title: "",
      price: 0 as number,
      status: "ACTIVE",
      quantity: 0,
      isFree: false,
      // startDate: undefined,
      endDate: undefined,
    },
  });
  function onSubmit(values: z.infer<typeof FormSchema>) {
    const formatedDates = values.selectedDates.map((date, index) => ({
      id: index,
      date: date,
    }));
    const stringDates = JSON.stringify(formatedDates);
    const data: TicketType = {
      title: values.title,
      price: values.price as number,
      dates: stringDates,
      quantity: values.quantity,
      endDate: values.endDate,
      status: values.status,
      eventId: evento.id,
      position: 0,
      type: "NORMAL",
      isFree: values.isFree
    };

    try {
      createTicketType(data);
      form.reset();
      setIsFree(false)
      toast({
        title: "Tipo de ticket creado!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al crear el tipo de ticket!",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-1">
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
          name="isFree"
          render={({ field }) => (
            <FormItem>              
              <FormControl>
                <Checkbox 
                    checked={field.value}
                    onCheckedChange={(e) => {
                      setIsFree(!field.value);
                      return field.onChange(!field.value)
                    }}
                  />
              </FormControl>
              <FormLabel>Gratis</FormLabel>
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
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  disabled={isFree}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cantidad disponible</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
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
              <div className="mb-4"></div>
              <FormLabel>Fecha(s)</FormLabel>
              {parsedEventDates.map((item: DatesType) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="selectedDates"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.date)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.date])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.date
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.date}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Disponible hasta</FormLabel>
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
                        <span>Seleccionar fecha</span>
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
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ACTIVE">Publicada</SelectItem>
                  <SelectItem value="INACTIVE">Borrador</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Guardar ticket</Button>
      </form>
    </Form>
  );
}
