import { queryOptions } from "@tanstack/react-query";

import { productApi } from "../api/products";

export const productKeys = {
  all: ["products"] as const,

  lists: () =>
    [...productKeys.all, "list"] as const,

  list: (page: number) =>
    [...productKeys.lists(), page] as const,

  details: () =>
    [...productKeys.all, "detail"] as const,

  detail: (id: number) =>
    [...productKeys.details(), id] as const,

  searches: () =>
    [...productKeys.all, "search"] as const,

  search: (query: string) =>
    [...productKeys.searches(), query] as const,

  categories: () =>
    [...productKeys.all, "category"] as const,

  category: (category: string) =>
    [...productKeys.categories(), category] as const,
};

export function productListQuery(
  page: number,
) {
  return queryOptions({
    queryKey: productKeys.list(page),
    queryFn: () =>
      productApi.getProducts(page),
  });
}

export function productQuery(id: number) {
  return queryOptions({
    queryKey: productKeys.detail(id),
    queryFn: () =>
      productApi.getProduct(id),
  });
}

export function productSearchQuery(
  query: string,
) {
  return queryOptions({
    queryKey: productKeys.search(query),
    queryFn: () =>
      productApi.searchProducts(query),
    enabled: query.trim().length >= 2,
  });
}

export function categoryProductsQuery(
  category: string,
) {
  return queryOptions({
    queryKey: productKeys.category(category),
    queryFn: () =>
      productApi.getCategoryProducts(category),
  });
}