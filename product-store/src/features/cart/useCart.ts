import { useQuery } from "@tanstack/react-query";

import { cartOptions } from "./cartOptions";

export function useCart() {
  return useQuery({
    ...cartOptions,

    select: (cart) => ({
      products: cart.products,

      count: cart.products.reduce(
        (total, item) =>
          total + item.quantity,
        0,
      ),

      total: cart.products.reduce(
        (total, item) =>
          total +
          item.price * item.quantity,
        0,
      ),
    }),
  });
}