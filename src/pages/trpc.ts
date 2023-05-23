import { initTRPC } from '@trpc/server';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import type { APIRoute } from 'astro';
import { z } from 'zod';

const t = initTRPC.create();

const appRouter = t.router({
  emailSub: t.procedure
    .input(z.string().email())
    .mutation(async ({ input }) => {
      console.log('emailSub', input);
    }),
});

export const prerender = false;

export const all: APIRoute = (opts) => {
  return fetchRequestHandler({
    endpoint: '/trpc',
    req: opts.request,
    router: appRouter,
    createContext: () => {
      return {};
    },
  });
};

export type AppRouter = typeof appRouter;
