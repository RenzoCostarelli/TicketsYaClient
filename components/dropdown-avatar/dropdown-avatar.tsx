import React from "react";

import { useSession } from "next-auth/react";
import { User } from "@/types/user";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

/**
 * Renders an avatar with a drop down menu for the user's profile options.
 * @param user - The user object to display.
 * @returns The DropDownAvatar component.
 */
export default function DropDownAvatar({ user }: { user?: User }) {
  const { data: session } = useSession();
  return (
    <DropdownMenuTrigger className="relative" asChild>
      <Avatar className="h-9 w-9 ml-4 cursor-pointer relative">
        <AvatarImage alt="@shadcn" src={session?.user?.image as string} />
        <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
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
  );
}
