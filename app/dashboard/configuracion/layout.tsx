import { Metadata } from "next";
import SidebarNav from "./sidebar-nav";

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

export default function SettingsLayout({ children }: SettingsLayoutProps) {
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
