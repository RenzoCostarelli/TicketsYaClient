import React, { useRef } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import { User } from "@/types/user";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import DropDownAvatar from "@/components/dropdown-avatar/dropdown-avatar";

/**
 * Renders a dropdown menu with the user's profile and options.
 * @param user the user object
 * @returns the dropdown menu component
 */
export default function DropDownMenu({ user }: { user?: User }) {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropDownAvatar user={user} />
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
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
            {!user?.mpAccessToken && <div className="dot-notification"></div>}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button onClick={() => signOut()}>Cerrar sesión</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
