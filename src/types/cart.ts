export interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
  stock: number;
}

export interface Cart {
  products: CartItem[];
}

export interface CartApiResponse {
  id: number;
  userId: number;
  products: Array<{
    id: number;
    quantity: number;
  }>;
  total: number;
  discountedTotal: number;
  totalProducts: number;
  totalQuantity: number;
}