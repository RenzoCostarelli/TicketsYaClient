import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.scss";
import NavBar from "@/components/nav-bar/nav-bar";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/session-provider/session-provider";
import { authOptions } from "./api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Megaticketsya.ya",
  description: "Plataforma de venta de entradas online",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <NavBar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
