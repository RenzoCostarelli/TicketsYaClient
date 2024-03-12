import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.scss";
import NavBar from "@/components/nav-bar/nav-bar";
import { Session, getServerSession } from "next-auth";
import SessionProvider from "@/components/session-provider/session-provider";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getUserByEmail } from "@/lib/api/users";

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
  const user = await getUserByEmail(session?.user?.email as string);
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <NavBar user={user} session={session as Session} />
          <main className="flex flex-col items-center gap-8 px-4 md:px-8 mx-auto max-w-5xl">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
