"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function Providers({ children }: React.PropsWithChildren) {
  const [client] = React.useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  );

  return (
    <PayPalScriptProvider
      options={{ "client-id": "AdzRG5jYeYS7r53aOoSDg7SjAHqkSMNGvOActwKb9sStySlpqSgMCwuK26yaful-5HTYXFBU0SYvUWGk", components: 'buttons' }}
    >
      <QueryClientProvider client={client}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </PayPalScriptProvider>
  );
}

export default Providers;