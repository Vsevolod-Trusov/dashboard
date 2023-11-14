import { initTRPC } from '@trpc/server';

export const tRPC = initTRPC.create();
export const router = tRPC.router;
export const procedure = tRPC.procedure;
