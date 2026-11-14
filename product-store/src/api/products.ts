import { fetchJson } from "./http";

import type {Product,ProductResponse,} from "../types/product";

export const LIMIT = 12;

export const productApi = {
  getProducts(page: number) {
    const skip = (page - 1) * LIMIT;

    return fetchJson<ProductResponse>(`/products?limit=${LIMIT}&skip=${skip}`,);
  },

  getProduct(id: number) {
    return fetchJson<Product>(`/products/${id}`,);
  },

  searchProducts(query: string) {
    return fetchJson<ProductResponse>(`/products/search?q=${encodeURIComponent(query,)}&limit=100`,);
  },

  getCategoryProducts(category: string) {
    return fetchJson<ProductResponse>(`/products/category/${encodeURIComponent(category,)}?limit=100`,);
  },
};