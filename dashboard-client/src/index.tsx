import { RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { httpBatchLink, createTRPCProxyClient } from '@trpc/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'assets/styles/index.module.scss';

import { BACKEND_URL } from 'common';
import Router from 'router';

import type { AppRouter } from '../../dashboard-server/src/main';

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
);

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
