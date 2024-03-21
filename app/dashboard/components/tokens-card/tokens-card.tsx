"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { ValidatorToken } from "@/types/validators";
import { TrashIcon } from "lucide-react";

export default function TokensCard({ token }: { token: ValidatorToken }) {
  const handleDeleteToken = () => {
    toast({
      title: "Evento Eliminado",
    });
  };
  return (
    <Card className="px-3">
      <CardHeader className="pt-6">
        <CardTitle className="text-4xl font-semibold">{token.token}</CardTitle>
        <CardDescription className="md:hidden">Tap para copiar</CardDescription>
        <CardDescription className="hidden md:block">
          Click para copiar
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          className="w-full"
          size="icon"
          variant="destructive"
          onClick={handleDeleteToken}
        >
          <TrashIcon className="w-6 h-6" /> Eliminar
        </Button>
      </CardFooter>
    </Card>
  );
}
