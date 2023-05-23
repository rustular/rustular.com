import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from './pages/trpc/[...trpc]';

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: import.meta.env.DEV
        ? 'http://localhost:3000/trpc'
        : `${import.meta.env.CF_PAGES_URL}/trpc`,
    }),
  ],
});

export default client;