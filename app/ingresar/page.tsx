import { getServerSession } from "next-auth";
import SignInButton from "../dashboard/components/sign-in-button/sign-in-button";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Ingresar() {
  const session = await getServerSession(authOptions);
  if (session && session.user) {
    redirect("/dashboard");
  }
  return <SignInButton />;
}
