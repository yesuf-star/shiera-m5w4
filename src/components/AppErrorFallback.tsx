import type {FallbackProps,} from "react-error-boundary";

export function AppErrorFallback({error,resetErrorBoundary,}: FallbackProps) {
  const message =
    error instanceof Error
      ? error.message
      : "Unknown error";

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-zinc-100">
      <div
        role="alert"
        className="w-full max-w-md rounded-2xl border border-red-500/40 bg-red-500/10 p-6"
      >
        <h1 className="text-2xl font-bold">
          Something went wrong
        </h1>

        <p className="mt-3 text-sm text-zinc-300">
          {message}
        </p>

        <button
          type="button"
          onClick={resetErrorBoundary}
          className="mt-6 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        >
          Try again
        </button>
      </div>
    </div>
  );
}