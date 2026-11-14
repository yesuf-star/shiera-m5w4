export function RouteSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="animate-pulse space-y-6 motion-reduce:animate-none"
    >
      <div className="h-10 w-1/3 rounded bg-zinc-800" />

      <div className="h-5 w-2/3 rounded bg-zinc-800" />

      <div className="h-64 rounded-2xl bg-zinc-900" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map(
          (_, index) => (
            <div
              key={index}
              className="h-72 rounded-xl border border-zinc-800 bg-zinc-900"
            />
          ),
        )}
      </div>
    </div>
  );
}