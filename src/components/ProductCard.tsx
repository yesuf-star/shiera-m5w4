import {
  useQueryClient,
} from "@tanstack/react-query";

import { Link } from "react-router";

import { Star } from "lucide-react";

import type {Product,} from "../types/product";

import {productQuery,} from "../queries/products";

import {loadProductDetail,} from "../routes/lazy";

import AddToCartButton from "../features/cart/AddToCartButton";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({product,}: ProductCardProps) {
  const queryClient = useQueryClient();

  function warmProduct() {
    void loadProductDetail();

    void queryClient.prefetchQuery(productQuery(product.id),);
  }

  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-700 transition hover:-translate-y-1 hover:border-violet-500/50">
      <Link
        to={`/products/${product.id}`}
        onMouseEnter={warmProduct}
        onFocus={warmProduct}
        className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
      >
        <div className="flex aspect-square items-center justify-center bg-white p-5">
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-contain"
          />
        </div>
      </Link>

      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-violet-400">
          {product.category}
        </p>

        <Link
          to={`/products/${product.id}`}
          onMouseEnter={warmProduct}
          onFocus={warmProduct}
          className="mt-2 block rounded-lg text-lg font-bold text-white hover:text-violet-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
        >
          {product.title}
        </Link>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold">
            ${product.price.toFixed(2)}
          </span>

          <span className="flex items-center gap-1 text-sm text-yellow-400">
            <Star
              size={16}
              fill="currentColor"
              aria-hidden="true"
            />

            {product.rating}
          </span>
        </div>

        <div className="mt-5">
          <AddToCartButton
            product={product}
          />
        </div>
      </div>
    </article>
  );
}