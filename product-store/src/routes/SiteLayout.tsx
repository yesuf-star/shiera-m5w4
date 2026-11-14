import {Suspense,} from "react";

import {Outlet, useLocation,} from "react-router";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { RouteFocus } from "../components/RouteFocus";

import {RouteSkeleton,} from "../components/skeletons/RouteSkeletons";

import {ProductDetailSkeleton,} from "../components/skeletons/ProductDetailSkeleton";

export function SiteLayout() {
  const { pathname } = useLocation();

  const isProductDetail =
    /^\/products\/[^/]+$/.test(pathname);

  return (
    <div className="min-h-screen bg-linear-to-br from-violet-50 via-violet-200 to-purple-300">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-violet-600 focus:px-4 focus:py-3 focus:font-semibold focus:text-white focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to content
      </a>

      <Header />

      <RouteFocus />

      <main
        id="main"
        tabIndex={-1}
        className="mx-auto min-h-[75vh] max-w-7xl px-4 py-8 outline-none sm:px-6 lg:px-8"
      >
        <Suspense
          key={pathname}
          fallback={isProductDetail ? (<ProductDetailSkeleton />) : (<RouteSkeleton />)
          }
        >
          <Outlet />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}