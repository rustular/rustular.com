import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from './pages/trpc';

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: import.meta.env.DEV
        ? 'http://localhost:3000/trpc'
        : import.meta.env.SITE,
    }),
  ],
});

export default client;