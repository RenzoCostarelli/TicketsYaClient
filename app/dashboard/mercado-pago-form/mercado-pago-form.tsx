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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
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

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  mpPublicKey: "",
  mpAccessToken: "",
};
export default function MercadoPagoForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
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
