import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md">
      <Search
        aria-hidden="true"
        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
        size={20}
      />

      <label
        htmlFor="product-search"
        className="sr-only"
      >
        Search products
      </label>

      <input
        id="product-search"
        type="search"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder="Search products..."
        className="w-full rounded-xl border border-zinc-700 bg-zinc-300 py-3 pl-11 pr-4 text-white placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
      />
    </div>
  );
}