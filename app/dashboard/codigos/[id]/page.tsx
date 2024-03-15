import { getDiscountCodeById } from "@/lib/actions";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import EditCodeForm from "@/app/dashboard/components/edit-discount-code/edit-discount-code-form";
import { DiscountCode } from "@/types/discount-code";

export default async function EditCode({
  params,
}: {
  params: { id: string };
}) {
  const discountCode = await getDiscountCodeById(params.id);
  return (
    <>
      <Button asChild variant="ghost">
        <Link href="/dashboard/codigos">
          <ChevronLeft /> Volver al panel
        </Link>
      </Button>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Editar código
      </h1>
      <EditCodeForm discountCode={discountCode as DiscountCode} />
    </>
  );
}
