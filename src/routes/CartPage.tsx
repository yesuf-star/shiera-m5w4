import {
  Minus,
  Plus,
  Trash2,
} from "lucide-react";

import { useCart } from "../features/cart/useCart";

import {
  useRemoveFromCart,
} from "../features/cart/useRemoveFromCart";

import {
  useUpdateCartQuantity,
} from "../features/cart/useUpdateCartQuantity";

import CartDialog from "../features/cart/CartDialog";

export default function CartPage() {
  const { data, isPending } = useCart();

  const removeFromCart =
    useRemoveFromCart();

  const updateQuantity =
    useUpdateCartQuantity();

  if (isPending) {
    return (
      <p className="text-zinc-400">
        Loading cart...
      </p>
    );
  }

  const products =
    data?.products ?? [];

  const total = data?.total ?? 0;

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">
            Shopping cart
          </p>

          <h1 className="mt-2 text-4xl font-black">
            Your cart
          </h1>
        </div>

        <CartDialog />
      </div>

      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {products.length === 0
          ? "Your cart is empty"
          : `${data?.count ?? 0} items in your cart`}
      </div>

      {products.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
          <p className="text-zinc-400">
            Your cart is empty.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
          <ul className="space-y-4">
            {products.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-5 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:flex-row sm:items-center"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-28 w-28 rounded-xl bg-white object-contain p-2"
                />

                <div className="min-w-0 flex-1">
                  <h2 className="font-bold">
                    {item.title}
                  </h2>

                  <p className="mt-2 text-zinc-400">
                    $
                    {item.price.toFixed(2)}
                  </p>
                </div>

                <div
                  className="flex items-center rounded-lg border border-zinc-700"
                  aria-label={`Quantity for ${item.title}`}
                >
                  <button
                    type="button"
                    aria-label={`Decrease quantity of ${item.title}`}
                    onClick={() =>
                      updateQuantity.mutate({
                        productId: item.id,
                        quantity:
                          item.quantity - 1,
                      })
                    }
                    disabled={
                      item.quantity <= 1
                    }
                    className="rounded-l-lg p-3 hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Minus
                      size={18}
                      aria-hidden="true"
                    />
                  </button>

                  <span
                    className="min-w-10 text-center"
                    aria-live="polite"
                  >
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    aria-label={`Increase quantity of ${item.title}`}
                    onClick={() =>
                      updateQuantity.mutate({
                        productId: item.id,
                        quantity:
                          item.quantity + 1,
                      })
                    }
                    disabled={
                      item.quantity >= item.stock
                    }
                    className="rounded-r-lg p-3 hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Plus
                      size={18}
                      aria-hidden="true"
                    />
                  </button>
                </div>

                <button
                  type="button"
                  aria-label={`Remove ${item.title} from cart`}
                  onClick={() =>
                    removeFromCart.mutate(
                      item.id,
                    )
                  }
                  className="rounded-lg p-3 text-red-400 transition hover:bg-red-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                >
                  <Trash2
                    size={20}
                    aria-hidden="true"
                  />
                </button>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-bold">
              Order summary
            </h2>

            <div className="mt-6 flex justify-between border-t border-zinc-800 pt-6 text-xl font-bold">
              <span>Total</span>

              <span>
                ${total.toFixed(2)}
              </span>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}