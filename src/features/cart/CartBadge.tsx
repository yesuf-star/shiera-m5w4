import { Link } from "react-router";
import { ShoppingCart } from "lucide-react";

import { useCart } from "./useCart";

export default function CartBadge() {
  const { data } = useCart();

  const count = data?.count ?? 0;

  return (
    <Link
      to="/cart"
      aria-label={`Shopping cart with ${count} items`}
      className="relative inline-flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-200 transition hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
    >
      <ShoppingCart
        size={20}
        aria-hidden="true"
      />

      <span>Cart</span>

      <span
        aria-hidden="true"
        className="rounded-full bg-violet-600 px-2 py-0.5 text-xs font-bold text-white"
      >
        {count}
      </span>

      <span
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {count === 1
          ? "1 item in cart"
          : `${count} items in cart`}
      </span>
    </Link>
  );
}