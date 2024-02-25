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
import { Button } from "@/components/ui/button";
import { getMercadPagoUrl, updateOrder } from "@/lib/actions";
import { Order } from "@/types/order";

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "Debe tener al menos 2 caracteres",
    }),
    lastName: z.string().min(2, {
      message: "Debe tener al menos 2 caracteres",
    }),
    email: z.string().email().min(5, { message: "Debe ser un email válido" }),
    confirmEmail: z
      .string()
      .email()
      .min(5, { message: "Debe ser un email válido" }),
    phone: z.string(),
    dni: z.string().min(8, { message: "Debe ser un dni válido" }),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Los correos electrónicos deben coincidir",
    path: ["confirmEmail"],
  });

export default function UserDataForm({ order }: { order: Order }) {
  const orderId = order?.id;
  const userId = order?.event!.userId;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      phone: "",
      confirmEmail: "",
      dni: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values", values);
    const orderData = {
      name: values.name,
      lastName: values.lastName,
      phone: values.phone,
      dni: values.dni,
      email: values.email,
    };

    try {
      const mpResponse = await getMercadPagoUrl(
        values,
        orderData,
        orderId!,
        userId
      );
    } catch (error) {
      console.log("error mercadopago", error);
    }
    // updateOrder(
    //   {
    //     name: values.name,
    //     lastName: values.lastName,
    //     phone: values.phone,
    //     dni: values.dni,
    //     email: values.email,
    //   },
    //   orderId as string
    // );
  }

  function expire() {
    updateOrder(
      {
        status: "EXPIRED",
      },
      orderId as string
    );
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => onSubmit(values))}
          className="space-y-8 w-[100%]"
        >
          <div className="flex gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input placeholder="Apellido" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="dni"
            render={({ field }) => (
              <FormItem>
                <FormLabel>DNI</FormLabel>
                <FormControl>
                  <Input placeholder="Dni" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefono</FormLabel>
                <FormControl>
                  <Input placeholder="Telefono" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="nombre@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reingresar email</FormLabel>
                <FormControl>
                  <Input placeholder="nombre@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit">
            Pagar
          </Button>
        </form>
      </Form>
    </>
  );
}
