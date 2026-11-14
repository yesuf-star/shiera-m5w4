import { queryOptions } from "@tanstack/react-query";

import { getCart } from "../../api/cart";
import { cartKeys } from "./cartKeys";

export const cartOptions = queryOptions({
  queryKey: cartKeys.detail(),
  queryFn: getCart,
  staleTime: Infinity,
});