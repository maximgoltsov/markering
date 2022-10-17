import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from 'server/router';
import { useTokenStore } from '../../entities/token/models/tokenStore';

const client = createTRPCProxyClient<AppRouter>({
  links:[
    httpBatchLink({
      url: 'http://localhost:8080/trpc',
      headers() {
       return {
        Authorization: useTokenStore.getState().token,
       }
      }
    })
  ],
});

export default client;
