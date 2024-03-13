import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import "@uploadthing/react/styles.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Plataforma de venta de entradas online",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/");
  }
  return (
    <>
      {/* Agregar navecaion del dashboard aca */}
      <div className="flex flex-col items-center gap-8 p-4 md:p-8 mx-auto w-full">
        <nav className="w-full max-w-md flex justify-around mb-8">
          <Link
            className="text-lg font-semibold text-gray-700 hover:text-gray-900"
            href="/dashboard"
          >
            Eventos
          </Link>
          <Link
            className="text-lg font-semibold text-gray-700 hover:text-gray-900"
            href="/dashboard/codigos"
          >
            Codigos de descuento
          </Link>
          <Link
            className="text-lg font-semibold text-gray-700 hover:text-gray-900"
            href="/dashboard/configuracion"
          >
            Configuración
          </Link>
        </nav>
        {children}
      </div>
      <Toaster />
    </>
  );
}
