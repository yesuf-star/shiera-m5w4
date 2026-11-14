export function ProductDetailSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="grid animate-pulse gap-8 md:grid-cols-2 motion-reduce:animate-none"
    >
      <div className="aspect-square rounded-2xl bg-zinc-900" />

      <div className="space-y-5">
        <div className="h-5 w-1/4 rounded bg-zinc-800" />

        <div className="h-12 w-3/4 rounded bg-zinc-800" />

        <div className="h-20 rounded bg-zinc-800" />

        <div className="h-8 w-1/4 rounded bg-zinc-800" />

        <div className="h-12 rounded-xl bg-zinc-800" />
      </div>
    </div>
  );
}