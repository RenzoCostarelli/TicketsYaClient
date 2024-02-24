import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Perfil() {
  return (
    <>
      <Button asChild variant="ghost">
        <Link href="/dashboard">
          <ChevronLeft /> Voler al panel
        </Link>
      </Button>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Perfil
      </h1>
    </>
  );
}
