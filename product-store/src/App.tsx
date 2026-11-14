import { lazy } from "react";

import {
  Route,
  Routes,
} from "react-router";

import { SiteLayout } from "./routes/SiteLayout";

import {
  loadCartPage,
  loadNotFound,
  loadProductDetail,
  loadProductList,
} from "./routes/lazy";

const ProductList = lazy(loadProductList,);

const ProductDetail = lazy(loadProductDetail,);

const CartPage = lazy(loadCartPage,);

const NotFound = lazy(loadNotFound,);

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route
          index
          element={<ProductList />}
        />

        <Route
          path="products/:id"
          element={<ProductDetail />}
        />

        <Route
          path="cart"
          element={<CartPage />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Route>
    </Routes>
  );
}