import { Link, NavLink } from "react-router";

import CartBadge from "../features/cart/CartBadge";

export default function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          to="/"
          className="rounded-lg text-xl font-black text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
        >
          ProductStore
        </Link>

        <nav
          aria-label="Main navigation"
          className="flex items-center gap-3"
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                isActive
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-white"
              }`
            }
          >
            Products
          </NavLink>

          <CartBadge />
        </nav>
      </div>
    </header>
  );
}