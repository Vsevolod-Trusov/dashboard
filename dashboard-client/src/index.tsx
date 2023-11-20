import { createTRPCReact } from '@trpc/react-query';
import ReactDOM from 'react-dom/client';

import App from 'App';
import 'assets/styles/index.module.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js';
import { AppRouter } from '../../dashboard-server/src/main';

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
