import { initTRPC } from '@trpc/server';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import type { APIRoute } from 'astro';
import { z } from 'zod';
import mailchimp from '@mailchimp/mailchimp_marketing';

const t = initTRPC.create();

const appRouter = t.router({
  emailSub: t.procedure
    .input(z.string().email())
    .mutation(async ({ input }) => {
      mailchimp.setConfig({
        apiKey: import.meta.env.MAILCHIMP,
        server: 'us21',
      });

      const response = await mailchimp.lists.addListMember('11385', {
        email_address: input,
        status: 'pending',
      });
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