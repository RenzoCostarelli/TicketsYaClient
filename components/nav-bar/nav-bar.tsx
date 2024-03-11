"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TicketIcon } from "lucide-react";
import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { User } from "@/types/user";

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
        <DropdownMenu>
          <DropdownMenuTrigger className="relative" asChild>
            <Avatar className="h-9 w-9 ml-4 cursor-pointer relative">
              <AvatarImage alt="@shadcn" src={session.user?.image as string} />
              <AvatarFallback>{session.user?.name?.charAt(0)}</AvatarFallback>
              {!user?.mpAccessToken && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="dot-notification"></div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Es necesario cargar los datos de pago</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              <span className="sr-only">Desplegar menú de usuario</span>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={"/dashboard/perfil"}>Perfil</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={"/dashboard"}>Panel</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={"/dashboard/integraciones"} className="relative">
                Integraciones
                {!user?.mpAccessToken && (
                  <div className="dot-notification"></div>
                )}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button onClick={() => signOut()}>Cerrar sesión</Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
}
