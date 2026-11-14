import { Link } from "react-router";

interface NotFoundProps {
  title?: string;
  message?: string;
}

export default function NotFound({
  title = "Page not found",
  message = "The page you requested does not exist.",
}: NotFoundProps) {
  return (
    <section className="flex min-h-[50vh] items-center justify-center text-center">
      <div>
        <p className="text-7xl font-black text-violet-500">
          404
        </p>

        <h1 className="mt-4 text-3xl font-bold">
          {title}
        </h1>

        <p className="mt-3 text-zinc-400">
          {message}
        </p>

        <Link
          to="/"
          className="mt-7 inline-block rounded-lg bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        >
          Back to products
        </Link>
      </div>
    </section>
  );
}