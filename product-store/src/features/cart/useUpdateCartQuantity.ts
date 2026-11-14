import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  updateCartQuantity,
} from "../../api/cart";

import { cartKeys } from "./cartKeys";

interface UpdateQuantityVariables {
  productId: number;
  quantity: number;
}

export function useUpdateCartQuantity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: UpdateQuantityVariables) =>
      updateCartQuantity(
        productId,
        quantity,
      ),

    onSuccess: (updatedCart) => {
      queryClient.setQueryData(
        cartKeys.detail(),
        updatedCart,
      );
    },
  });
}