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
import { updateUser } from "@/lib/actions";
import { User } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";

const profileFormSchema = z.object({
  mpPublicKey: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  mpAccessToken: z.string({
    required_error: "Please select an email to display.",
  }),
});

type MpFormValues = z.infer<typeof profileFormSchema>;

export default function MercadoPagoForm({ user }: { user: User }) {
  const defaultValues: Partial<MpFormValues> = {
    mpPublicKey: user.mpPublicKey as string | "",
    mpAccessToken: user.mpPublicKey as string | "",
  };
  const form = useForm<MpFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(values: MpFormValues) {
    try {
      updateUser(
        {
          mpAccessToken: values.mpAccessToken,
          mpPublicKey: values.mpPublicKey,
        },
        user?.email as string
      );

      toast({
        title: "Datos de mercadopago actualizados",
      });
    } catch (error) {}
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="mpPublicKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>MercadoPago Public Key</FormLabel>
              <FormControl>
                <Input placeholder="MercadoPago Public Key" {...field} />
              </FormControl>
              <FormDescription>Aca va la public key</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
