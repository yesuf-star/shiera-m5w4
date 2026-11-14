export function RouteSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="animate-pulse space-y-6 motion-reduce:animate-none"
    >
      <div className="h-10 w-1/3 rounded bg-gray-200" />
      <div className="h-5 w-2/3 rounded bg-gray-200" />

      <div className="h-64 rounded-2xl bg-gray-200" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map(
          (_, index) => (
            <div
              key={index}
              className="h-72 rounded-xl border border-gray-200 bg-white p-4 motion-reduce:animate-none"
            />
          ),
        )}
      </div>
    </div>
  );
}