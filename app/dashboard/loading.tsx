import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section>
      <h1 className="mb-14 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        HOLA
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-3 bg-red">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="flex flex-col space-y-3 bg-red">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="flex flex-col space-y-3 bg-red">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
