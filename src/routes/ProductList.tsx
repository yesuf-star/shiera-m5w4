import {
  Suspense,
  useDeferredValue,
  useState,
  useTransition,
} from "react";

import {
  keepPreviousData,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";

import {
  useSearchParams,
} from "react-router";

import {
  LIMIT,
} from "../api/products";

import {
  categoryProductsQuery,
  productListQuery,
  productSearchQuery,
} from "../queries/products";

import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

import {
  ProductGridSkeleton,
} from "../components/skeletons/ProductGridSkeleton";

const categories = [
  "all",
  "smartphones",
  "laptops",
  "fragrances",
] as const;

type Category =
  (typeof categories)[number];

function CategoryProductGrid({
  category,
}: {
  category: Category;
}) {
  const { data } = useSuspenseQuery(
    categoryProductsQuery(category),
  );

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {data.products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

function AllProducts({
  page,
}: {
  page: number;
}) {
  const { data } = useQuery({
    ...productListQuery(page),
    placeholderData: keepPreviousData,
  });

  const products = data?.products ?? [];

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

export default function ProductList() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const [search, setSearch] = useState("");

  const [category, setCategory] =
    useState<Category>("all");

  const [isPending, startTransition] =
    useTransition();

  const page = Math.max(
    1,
    Number(searchParams.get("page")) || 1,
  );

  const deferredSearch =
    useDeferredValue(search);

  const searchQuery = useQuery(
    productSearchQuery(
      deferredSearch.trim(),
    ),
  );

  const listQuery = useQuery({
    ...productListQuery(page),
    placeholderData: keepPreviousData,
  });

  const isSearching =
    deferredSearch.trim().length >= 2;

  const searchProducts =
    searchQuery.data?.products ?? [];

  const totalPages = Math.ceil(
    (listQuery.data?.total ?? 0) / LIMIT,
  );

  function changeCategory(
    nextCategory: Category,
  ) {
    startTransition(() => {
      setCategory(nextCategory);
      setSearch("");
      setSearchParams({
        page: "1",
      });
    });
  }

  function changePage(nextPage: number) {
    setSearchParams({
      page: String(nextPage),
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <section>
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">
          Product catalog
        </p>

        <h1 className="mt-3 text-4xl font-black">
          Discover products
        </h1>

        <p className="mt-3 max-w-2xl text-zinc-400">
          Search products, browse categories,
          and manage your cart.
        </p>
      </div>

      <SearchBar
        value={search}
        onChange={setSearch}
      />

      <div className="mt-8">
        <div
          role="tablist"
          aria-label="Product category"
          className="flex flex-wrap gap-3"
        >
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={
                item === category
              }
              onClick={() =>
                changeCategory(item)
              }
              className={`rounded-lg px-4 py-2 font-medium capitalize transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                item === category
                  ? "bg-violet-600 text-white"
                  : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {search.trim().length === 1 && (
        <p className="mt-5 text-sm text-zinc-400">
          Type at least 2 characters to search.
        </p>
      )}

      <div
        role="tabpanel"
        aria-busy={
          isPending ||
          listQuery.isFetching ||
          searchQuery.isFetching
        }
        className={`mt-8 transition-opacity ${
          isPending
            ? "opacity-60"
            : "opacity-100"
        }`}
      >
        {isSearching ? (
          <>
            {searchQuery.isPending && (
              <ProductGridSkeleton />
            )}

            {searchQuery.isError && (
              <p
                role="alert"
                className="rounded-xl border border-red-500/40 bg-red-500/10 p-5 text-red-300"
              >
                Search failed. Please try again.
              </p>
            )}

            {!searchQuery.isPending &&
              !searchQuery.isError &&
              searchProducts.length === 0 && (
                <p className="text-zinc-400">
                  No products found.
                </p>
              )}

            {searchProducts.length > 0 && (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {searchProducts.map(
                  (product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ),
                )}
              </div>
            )}
          </>
        ) : category === "all" ? (
          <>
            {listQuery.isPending ? (
              <ProductGridSkeleton />
            ) : (
              <AllProducts page={page} />
            )}

            {totalPages > 1 && (
              <Pagination
                page={page}
                totalPages={totalPages}
                disabled={
                  listQuery.isPlaceholderData
                }
                onPageChange={changePage}
              />
            )}
          </>
        ) : (
          <Suspense
            fallback={<ProductGridSkeleton />}
          >
            <CategoryProductGrid
              category={category}
            />
          </Suspense>
        )}
      </div>
    </section>
  );
}