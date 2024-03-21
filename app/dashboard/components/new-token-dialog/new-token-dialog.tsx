"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { createValidatorToken } from "@/lib/actions";
import { Dices } from "lucide-react";
import { useEffect, useState } from "react";

function generateRandomCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@!";
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export default function NewTokenDialog({ eventId }: { eventId: string }) {
  const [randomCode, setRandomCode] = useState<string>("");

  useEffect(() => {
    setRandomCode(generateRandomCode());
  }, []);

  function onSubmit() {
    console.log("hola");
    createValidatorToken({
      token: randomCode,
      eventId,
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Nuevo Token</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nuevo token</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4">
          <div className="text-2xl md:text-5xl font-bold">{randomCode}</div>
          <Button
            type="button"
            variant="outline"
            onClick={() => setRandomCode(generateRandomCode())}
          >
            <Dices />
          </Button>
        </div>
        <Separator />
        <DialogFooter>
          <Button type="submit" className="w-full" onClick={() => onSubmit()}>
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
