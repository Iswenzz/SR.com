"use client";

import { FC, PropsWithChildren } from "react";
import NextTopLoader from "nextjs-toploader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Client: FC<PropsWithChildren> = ({ children }) => (
	<QueryClientProvider client={queryClient}>
		<NextTopLoader color="#5C16C6" showSpinner={false} />
		{children}
	</QueryClientProvider>
);

export default Client;
