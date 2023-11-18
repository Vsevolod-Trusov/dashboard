import ReactDOM from 'react-dom/client';
import { createTRPCReact } from '@trpc/react-query';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'assets/styles/index.module.scss';
import App from 'App';

import { AppRouter } from '../../dashboard-server/src/main';
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

export const trpc = createTRPCReact<AppRouter>();

root.render(<App />);
