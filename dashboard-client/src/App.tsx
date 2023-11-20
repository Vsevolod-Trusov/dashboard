import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { TRPCError } from '@trpc/server';
import { BACKEND_URL, ROUTES } from 'common';
import { trpc } from 'index';
import { SnackbarProvider } from 'notistack';
import Router from 'router';
import store from 'store';

const App = () => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            onError: (error: any) => {
              if ((error as TRPCError).message == 'UNAUTHORIZED') {
                document.location.href = ROUTES.SIGN_IN;
              }
            },
          },
          mutations: {
            onError: (error: unknown) => {
              if ((error as TRPCError).message == 'UNAUTHORIZED') {
                document.location.href = ROUTES.SIGN_IN;
              }
            },
          },
        },
      }),
  );
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: BACKEND_URL,
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: 'include',
            });
          },
        }),
      ],
    }),
  );

  return (
    <>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <SnackbarProvider>
              <RouterProvider router={Router} />
            </SnackbarProvider>
          </Provider>
        </QueryClientProvider>
      </trpc.Provider>
    </>
  );
};
export default App;
