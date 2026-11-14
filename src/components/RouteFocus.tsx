import {useEffect, useRef, useState,} from "react";

import { useLocation } from "react-router";

function getRouteName(pathname: string,): string {
  if (pathname === "/") {
    return "Products";
  }

  if (pathname === "/cart") {
    return "Shopping cart";
  }

  if (pathname.startsWith("/products/")) {
    return "Product details";
  }

  return "Page";
}

export function RouteFocus() {
  const { pathname } = useLocation();

  const isFirstRender = useRef(true);

  const [announcement, setAnnouncement,] = useState("");

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    document.getElementById("main") ?.focus({ preventScroll: true, });

    window.scrollTo({top: 0,})
    setAnnouncement(`Navigated to ${getRouteName(pathname, )}`,);
  }, [pathname]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  );
}