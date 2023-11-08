
import { userRouter } from './users';
import { tRPC } from '../trpc';
import { departmentRouter } from './departments';

export const router = tRPC.router({
  users: userRouter,
  departments: departmentRouter
})
