import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  addToCart,
  createCartItem,
  getCart,
  updateCart,
} from "../../api/cart";

import type { Cart } from "../../types/cart";
import type { Product } from "../../types/product";

import { cartKeys } from "./cartKeys";

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: Product) =>
      addToCart(product),

    onMutate: async (product) => {
      await queryClient.cancelQueries({
        queryKey: cartKeys.detail(),
      });

      const previousCart =
        queryClient.getQueryData<Cart>(
          cartKeys.detail(),
        ) ?? getCart();

      const existingItem =
        previousCart.products.find(
          (item) => item.id === product.id,
        );

      const optimisticCart: Cart = {
        products: existingItem
          ? previousCart.products.map((item) =>
              item.id === product.id
                ? {
                    ...item,
                    quantity: Math.min(
                      item.quantity + 1,
                      item.stock,
                    ),
                  }
                : item,
            )
          : [
              ...previousCart.products,
              createCartItem(product),
            ],
      };

      queryClient.setQueryData(
        cartKeys.detail(),
        optimisticCart,
      );

      updateCart(optimisticCart);

      return {
        previousCart,
      };
    },

    onError: (_error, _product, context) => {
      if (!context) {
        return;
      }

      queryClient.setQueryData(
        cartKeys.detail(),
        context.previousCart,
      );

      updateCart(context.previousCart);
    },

    onSettled: () => {
      void queryClient.invalidateQueries({
        queryKey: cartKeys.detail(),
      });
    },
  });
}