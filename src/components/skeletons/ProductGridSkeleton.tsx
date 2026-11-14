interface ProductGridSkeletonProps {
  count?: number;
}

export function ProductGridSkeleton({count = 12,}: ProductGridSkeletonProps) {
  return (
    <ul
      aria-hidden="true"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: count }).map(
        (_, index) => (
          <li
            key={index}
            className="animate-pulse rounded-xl border border-zinc-800 bg-zinc-900 p-4 motion-reduce:animate-none"
          >
            <div className="aspect-square w-full rounded-lg bg-zinc-800" />

            <div className="mt-4 h-5 w-2/3 rounded bg-zinc-800" />

            <div className="mt-3 h-4 w-1/3 rounded bg-zinc-800" />

            <div className="mt-5 h-10 rounded-lg bg-zinc-800" />
          </li>
        ),
      )}
    </ul>
  );
}