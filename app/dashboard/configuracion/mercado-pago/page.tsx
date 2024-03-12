import MercadoPagoForm from "../../mercado-pago-form/mercado-pago-form";
import { getUserByEmail } from "@/lib/api/users";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default async function MercadoPago() {
  const session = await getServerSession(authOptions);
  const user = await getUserByEmail(session?.user?.email as string);
  return (
    <>
      {!user.mpAccessToken && (
        <Alert variant="destructive">
          <AlertTitle>Atención!</AlertTitle>
          <AlertDescription>
            Es necesario que completes tus datos de MercadoPago para poder
            cobrar.
          </AlertDescription>
        </Alert>
      )}
      <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Mercado Pago
      </h2>
      <div className="bg-gray-100 p-5 rounded">
        <MercadoPagoForm user={user} />
      </div>
    </>
  );
}
