"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import { Session } from "next-auth";
import { User } from "@/types/user";

export default function AdminDropDown({
  user,
  session,
}: {
  user: User;
  session: Session;
}) {
  return (
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
        <DropdownMenuItem asChild>
          <Link
            href={"/dashboard/configuracion/perfil"}
            className="font-bold cursor-pointer"
          >
            {session.user?.name}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={"/dashboard"} className="cursor-pointer">
            Panel
          </Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem asChild>
          <Link href={"/dashboard/integraciones"} className="relative">
            Integraciones
            {!user?.mpAccessToken && <div className="dot-notification"></div>}
          </Link>
        </DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button onClick={() => signOut()} className="cursor-pointer">
            Cerrar sesión
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
