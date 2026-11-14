import React from "react";
import ReactDOM from "react-dom/client";

import {QueryClient, QueryClientProvider, QueryErrorResetBoundary,} from "@tanstack/react-query";

import {ReactQueryDevtools,} from "@tanstack/react-query-devtools";

import {BrowserRouter,} from "react-router";

import {ErrorBoundary,} from "react-error-boundary";

import App from "./App";

import { AppErrorFallback,} from "./components/AppErrorFallback";

import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: true,
    },

    // mutations: {
    //   retry: 0,
    // },
  },
});

ReactDOM.createRoot(document.getElementById("root")!,).render(
  <React.StrictMode>
    <QueryClientProvider
      client={queryClient} >
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            FallbackComponent={AppErrorFallback }
            onReset={reset}
          >
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>

      <ReactQueryDevtools
        initialIsOpen
      />
    </QueryClientProvider>
  </React.StrictMode>,
);