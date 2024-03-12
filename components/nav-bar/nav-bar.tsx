"use client";

import { TicketIcon } from "lucide-react";
import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";

import { User } from "@/types/user";
import DropDownMenu from "@/components/dropdown-menu/dropdown-menu";

export default function NavBar({ user }: { user?: User }) {
  const { data: session } = useSession();
  return (
    <header className="flex h-20 w-full items-center px-4 md:px-6 bg-neutral-950 text-white">
      <Link className="mr-6" href="/">
        <TicketIcon className="h-6 w-6" />
        <span className="sr-only">Mega Archi ticket Inc</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4 hover:text-green-500"
          href="#"
        >
          FAQ
        </Link>
      </nav>
      {!session && (
        <Button
          className="ml-6"
          onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })}
        >
          Ingresar/Registrarse
        </Button>
      )}
      {session && (
        <DropDownMenu user={user} />
      )}
    </header>
  );
}
