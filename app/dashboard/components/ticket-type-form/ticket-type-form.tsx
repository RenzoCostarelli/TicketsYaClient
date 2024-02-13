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

const ticketsFormSchema = z.object({
  selectedDates: z
    .array(z.number())
    .min(1, "Debes seleccionar al menos una fecha."),
  title: z.string(),
  price: z.number(),
  quantity: z.number(),
  status: z.string(),
  startDate: z.date(),
  endDate: z.date(),
});

export default function TycketTypeForm({ evento }: { evento: Evento }) {
  const parsedDates = JSON.parse(evento.dates);
  const form = useForm<z.infer<typeof ticketsFormSchema>>({
    resolver: zodResolver(ticketsFormSchema),
    defaultValues: {
      selectedDates: parsedDates,
      title: "",
      price: 0,
    },
  });
  function onSubmit(values: z.infer<typeof ticketsFormSchema>) {
    console.log("values", values);
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
          name="endDate"
          render={({ field }) => (
            <FormItem>
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        <FormField
          control={form.control}
          name="selectedDates"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Fechas</FormLabel>
              </div>
              {parsedDates.map((date: any) => {
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
                                  ? field.onChange([...field.value, date.id])
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

        <Button type="submit">Guardar ticket</Button>
      </form>
    </Form>
  );
}
