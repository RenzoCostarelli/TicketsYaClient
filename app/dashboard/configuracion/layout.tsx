import { Metadata } from "next";
import SidebarNav from "./sidebar-nav";
import { getUserByEmail } from "@/lib/api/users";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getAllUserConfiguration } from "@/lib/actions";
import { createUserConfiguration } from "@/lib/api/user-configuration";

export const metadata: Metadata = {
  title: "Configuración",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarNavItems = [
  {
    title: "Perfil",
    href: "/dashboard/configuracion/perfil",
  },
  {
    title: "MercadoPago",
    href: "/dashboard/configuracion/mercado-pago",
  },
  {
    title: "Notificaciones",
    href: "/dashboard/configuracion/notificaciones",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default async function SettingsLayout({
  children,
}: SettingsLayoutProps) {
  const session = await getServerSession(authOptions);
  const { id } = await getUserByEmail(session?.user?.email as string);
  const userConfiguration = (await getAllUserConfiguration(id)) || [];
  if (userConfiguration.length === 0) {
    await createUserConfiguration(id);
  }
  return (
    <>
      <div className="space-y-6 p-10 pb-16 w-full">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Configuración</h2>
          <p className="text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur.
          </p>
        </div>
        <div className="flex lg:flex-row space-y-8 lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
