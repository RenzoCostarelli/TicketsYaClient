import NewTokenDialog from "@/app/dashboard/components/new-token-dialog/new-token-dialog";
import TokensCard from "@/app/dashboard/components/tokens-card/tokens-card";
import { Button } from "@/components/ui/button";
import { getTokensByEvent } from "@/lib/actions";
import { ValidatorToken } from "@/types/validators";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function Validators({
  params,
}: {
  params: { id: string };
}) {
  const tokens = await getTokensByEvent(params.id);
  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-7xl">
        Tokens de validadores
      </h1>
      {tokens && (
        <>
          <NewTokenDialog eventId={tokens[0].event.id} />
          <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            {tokens[0].event.title}
          </h2>
        </>
      )}
      {tokens &&
        tokens.map((token: ValidatorToken) => (
          <TokensCard token={token} key={token.id} />
        ))}
    </>
  );
}
