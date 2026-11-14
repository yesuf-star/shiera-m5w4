export function ProductDetailSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="grid animate-pulse gap-8 md:grid-cols-2 motion-reduce:animate-none"
    >
      <div className="aspect-square rounded-2xl bg-white" />

      <div className="space-y-5">
        <div className="h-5 w-1/4 rounded bg-gray-200" />

        <div className="h-12 w-3/4 rounded bg-gray-200" />

        <div className="h-20 rounded bg-gray-200" />

        <div className="h-8 w-1/4 rounded bg-gray-200" />

        <div className="h-12 rounded-xl bg-gray-200" />
      </div>
    </div>
  );
}