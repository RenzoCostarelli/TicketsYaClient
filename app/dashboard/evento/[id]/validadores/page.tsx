import { getTokensByEvent } from "@/lib/actions";

export default async function Validators({
  params,
}: {
  params: { id: string };
}) {
  const tokens = await getTokensByEvent(params.id);
  console.log(tokens);
  return <h1>{params.id}</h1>;
}
