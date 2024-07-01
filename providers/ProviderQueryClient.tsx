import React, { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
const ProviderQueryClient = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 60000,
        cacheTime: 60000,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ProviderQueryClient;
