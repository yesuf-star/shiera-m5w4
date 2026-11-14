interface PaginationProps {
  page: number;
  totalPages: number;
  disabled?: boolean;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  disabled = false,
  onPageChange,
}: PaginationProps) {
  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex items-center justify-center gap-4"
    >
      <button
        type="button"
        disabled={page === 1 || disabled}
        onClick={() =>
          onPageChange(page - 1)
        }
        className="rounded-lg bg-zinc-300 px-4 py-2 font-semibold transition hover:bg-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>

      <span aria-current="page">
        Page {page} of {totalPages}
      </span>

      <button
        type="button"
        disabled={page === totalPages || disabled}
        onClick={() =>
          onPageChange(page + 1)
        }
        className="rounded-lg bg-zinc-300 px-4 py-2 font-semibold transition hover:bg-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </nav>
  );
}