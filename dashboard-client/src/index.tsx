import { RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { httpBatchLink, createTRPCProxyClient } from '@trpc/client';

import { BACKEND_URL } from 'common';
import Router from 'router';

import type { AppRouter } from '../../dashboard-server/src/main';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

export const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: BACKEND_URL,
    }),
  ],
});

root.render(<RouterProvider router={Router} />);
