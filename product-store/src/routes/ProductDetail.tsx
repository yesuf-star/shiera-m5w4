import {
  QueryErrorResetBoundary,
  useSuspenseQuery,
} from "@tanstack/react-query";

import {
  useParams,
} from "react-router";

import {
  ErrorBoundary,
  type FallbackProps,
} from "react-error-boundary";

import {
  ArrowLeft,
  Star,
} from "lucide-react";

import {
  Link,
} from "react-router";

import {
  HttpError,
} from "../api/http";

import {
  productQuery,
} from "../queries/Products";

import AddToCartButton from "../features/cart/AddToCartButton";

import NotFound from "./NotFound";

function ProductErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  if (
    error instanceof HttpError &&
    error.status === 404
  ) {
    return (
      <NotFound
        title="Product not found"
        message="The product you requested does not exist."
      />
    );
  }

  return (
    <div
      role="alert"
      className="rounded-2xl border border-red-500/40 bg-red-500/10 p-6"
    >
      <h2 className="text-xl font-bold">
        Couldn't load this product
      </h2>

      <button
        type="button"
        onClick={resetErrorBoundary}
        className="mt-5 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
      >
        Retry
      </button>
    </div>
  );
}

function ProductDetailContent({
  productId,
}: {
  productId: number;
}) {
  const { data: product } =
    useSuspenseQuery(
      productQuery(productId),
    );

  return (
    <article>
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-2 rounded-lg  transition hover:text-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
      >
        <ArrowLeft
          size={18}
          aria-hidden="true"
        />

        Back to products
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex aspect-square items-center justify-center rounded-2xl bg-white p-8">
          <img
            src={
              product.images[0] ??
              product.thumbnail
            }
            alt={product.title}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="font-semibold uppercase tracking-wide text-violet-400">
            {product.category}
          </p>

          <h1 className="mt-3 text-3xl font-black sm:text-5xl">
            {product.title}
          </h1>

          <div className="mt-4 flex items-center gap-2 text-yellow-400">
            <Star
              size={20}
              fill="currentColor"
              aria-hidden="true"
            />

            <span>
              {product.rating}
            </span>
          </div>

          <p className="mt-6 leading-7">
            {product.description}
          </p>

          <p className="mt-8 text-3xl font-bold">
            ${product.price.toFixed(2)}
          </p>

          <p className="mt-2 text-sm text-zinc-800">
            {product.stock} available
          </p>

          <div className="mt-8 max-w-sm">
            <AddToCartButton
              product={product}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProductDetail() {
  const { id } = useParams();

  const productId = Number(id);

  const isValidId =
    id !== undefined &&
    /^\d+$/.test(id) &&
    Number.isInteger(productId) &&
    productId > 0;

  if (!isValidId) {
    return <NotFound />;
  }

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          FallbackComponent={
            ProductErrorFallback
          }
          onReset={reset}
          resetKeys={[productId]}
        >
          <ProductDetailContent
            productId={productId}
          />
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}