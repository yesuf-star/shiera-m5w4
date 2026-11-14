import { ShoppingCart } from "lucide-react";

import type { Product } from "../../types/product";
import { useAddToCart } from "./useAddToCart";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({
  product,
}: AddToCartButtonProps) {
  const addToCart = useAddToCart();

  const isDisabled =
    addToCart.isPending ||
    product.stock <= 0;

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={() =>
        addToCart.mutate(product)
      }
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 font-semibold text-white transition hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <ShoppingCart
        size={18}
        aria-hidden="true"
      />

      {addToCart.isPending
        ? "Adding..."
        : product.stock <= 0
          ? "Out of stock"
          : "Add to cart"}
    </button>
  );
}