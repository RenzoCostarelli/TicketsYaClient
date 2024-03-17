"use client";
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
import { Input } from "@/components/ui/input";

import { toast } from "@/components/ui/use-toast";
import { updateUser, updateUserConfiguration } from "@/lib/actions";
import { User } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";

const profileFormSchema = z.object({
  mpAccessToken: z.string({
    required_error: "Campo requerido",
  }),
});

type MpFormValues = z.infer<typeof profileFormSchema>;

export default function MercadoPagoForm({
  configuration,
}: {
  configuration: UserConfiguration[];
}) {
  const defaultValues: Partial<MpFormValues> = {
    mpAccessToken: configuration[0].mpAccessToken as string | "",
  };
  const form = useForm<MpFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(values: MpFormValues) {
    try {
      updateUserConfiguration(
        {
          mpAccessToken: values.mpAccessToken,
        },
        configuration[0].id as string
      );
      toast({
        title: "Datos de mercadopago actualizados",
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="mpAccessToken"
          render={({ field }) => (
            <FormItem>
              <FormLabel>MercadoPago Access Token</FormLabel>
              <FormControl>
                <Input placeholder="MercadoPago Access Token" {...field} />
              </FormControl>
              <FormDescription>
                Aca va el access toekn{" "}
                <Link href="/examples/forms">elo encontras aca</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Actualizar datos
        </Button>
      </form>
    </Form>
  );
}
