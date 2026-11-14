import { fetchJson } from "./http";

import type { Product } from "../types/product";
import type {Cart,CartApiResponse,CartItem,} from "../types/cart";

const CART_STORAGE_KEY = "product-store-cart";

const emptyCart: Cart = {products: [],};

export function getCart(): Cart {
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY,);

    if (!storedCart) {
      return emptyCart;
    }

    const parsedCart: unknown = JSON.parse(storedCart,);

    if (
      typeof parsedCart === "object" &&
      parsedCart !== null &&
      "products" in parsedCart &&
      Array.isArray(parsedCart.products)
    ) {
      return parsedCart as Cart;
    }

    return emptyCart;
  } catch {
    return emptyCart;
  }
}

export function updateCart(cart: Cart): Cart {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart),);

  return cart;
}

export function createCartItem(product: Product,): CartItem {
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    thumbnail: product.thumbnail,
    quantity: 1,
    stock: product.stock,
  };
}

export async function addToCart(product: Product,): Promise<CartApiResponse> {
  await fetchJson<Product>(`/products/${product.id}`,);

  return fetchJson<CartApiResponse>(
    "/carts/add",
    {
      method: "POST",
      body: JSON.stringify({
        userId: 1,
        products: [
          {
            id: product.id,
            quantity: 1,
          },
        ],
      }),
    },
  );
}

export function removeFromCart(productId: number,): Cart {
  const cart = getCart();

  const updatedCart: Cart = {
    products: cart.products.filter((item) => item.id !== productId,),
  };

  return updateCart(updatedCart);
}

export function updateCartQuantity(productId: number,quantity: number,): Cart {
  const cart = getCart();

  const updatedCart: Cart = {
    products: cart.products.map((item) => {
        if (item.id !== productId) {
          return item;
        }

        return {
          ...item,
          quantity: Math.min(
            Math.max(quantity, 1),
            item.stock,
          ),
        };
      })
      .filter((item) => item.quantity > 0),
  };

  return updateCart(updatedCart);
}