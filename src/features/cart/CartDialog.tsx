import {useRef,} from "react";

import { X } from "lucide-react";

import { useCart } from "./useCart";
import { useRemoveFromCart } from "./useRemoveFromCart";

export default function CartDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const { data } = useCart();
  const removeFromCart =
    useRemoveFromCart();

  const products = data?.products ?? [];

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() =>
          dialogRef.current?.showModal()
        }
        className="rounded-lg bg-violet-600 px-4 py-2 font-semibold text-white transition hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
      >
        Quick cart
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="cart-dialog-title"
        className="w-[calc(100%-2rem)] max-w-md rounded-2xl border border-zinc-700 bg-zinc-900 p-0 text-zinc-100 shadow-2xl backdrop:bg-black/70"
        onClick={(event) => {
          if (
            event.target === dialogRef.current
          ) {
            dialogRef.current.close();
          }
        }}
      >
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h2
              id="cart-dialog-title"
              className="text-xl font-bold"
            >
              Your cart
            </h2>

            <button
              type="button"
              onClick={() =>
                dialogRef.current?.close()
              }
              aria-label="Close cart dialog"
              className="rounded-lg p-2 transition hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              <X
                size={20}
                aria-hidden="true"
              />
            </button>
          </div>

          {products.length === 0 ? (
            <p className="mt-6 text-zinc-400">
              Your cart is empty.
            </p>
          ) : (
            <ul className="mt-6 space-y-4">
              {products.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 border-b border-zinc-800 pb-4"
                >
                  <img
                    src={item.thumbnail}
                    alt=""
                    className="h-14 w-14 rounded-lg object-contain bg-white"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">
                      {item.title}
                    </p>

                    <p className="text-sm text-zinc-400">
                      {item.quantity} × $
                      {item.price.toFixed(2)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>removeFromCart.mutate(item.id,)
                    }
                    className="rounded-lg px-3 py-2 text-sm font-semibold text-red-400 hover:bg-red-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </dialog>
    </>
  );
}