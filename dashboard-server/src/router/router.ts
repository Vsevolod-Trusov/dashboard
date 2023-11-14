import { userRouter } from './users';
import { tRPC } from '../trpc';
import { departmentRouter } from './departments';
import { companyRouter } from './company';

export const router = tRPC.router({
  users: userRouter,
  departments: departmentRouter,
  companies: companyRouter,
});
