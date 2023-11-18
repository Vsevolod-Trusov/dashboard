import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { trpc } from 'index';
import { useState } from 'react';
import { BACKEND_URL } from 'common';
import { RouterProvider } from 'react-router-dom';
import Router from 'router';
import { httpBatchLink } from '@trpc/client';

const Component = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: BACKEND_URL,
        }),
      ],
    }),
  );

  return (
    <>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={Router} />
          );
        </QueryClientProvider>
      </trpc.Provider>
      ,
    </>
  );
};
export default Component;
