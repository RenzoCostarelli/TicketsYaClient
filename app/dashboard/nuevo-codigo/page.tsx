import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserByEmail } from "@/lib/api/users";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import CreateCodeForm from "../components/create-discount-code/create-discount-code";
import { getEventsByUserId } from "@/lib/api/eventos";

export default async function NewEvent() {
  const session = await getServerSession(authOptions);
  const { id } = await getUserByEmail(session?.user?.email as string);
  const events = await getEventsByUserId(id);
  return (
    <>
      <Button asChild variant="ghost">
        <Link href="/dashboard/codigos">
          <ChevronLeft /> Voler al panel
        </Link>
      </Button>

      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Nuevo código
      </h1>

      <CreateCodeForm events={ events } />
    </>
  );
}