import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDiscountCodeByUserId } from "@/lib/api/descuento-code";
import { Plus } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserByEmail } from "@/lib/api/users";

import { DiscountCode } from "@/types/discount-code";
import CodeCard from "../components/code-card/code-card";

export default async function Codes() {
  const session = await getServerSession(authOptions);
  const { id } = await getUserByEmail(session?.user?.email as string);
  const discountCode = await getDiscountCodeByUserId(id);

  return (
    <>
      <Button asChild variant="secondary">
        <Link href={"/dashboard/nuevo-codigo"}>
          <Plus className="mr-2" /> Nuevo código
        </Link>
      </Button>
      <div className="flex flex-col items-center gap-8 p-4 md:p-8">        
        {discountCode &&
          discountCode.map((discountCode) => (
            <CodeCard discountCode={discountCode as DiscountCode} key={discountCode.id} />
          ))}
      </div>
    </>
  );
}
