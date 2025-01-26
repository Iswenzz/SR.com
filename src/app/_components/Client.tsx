"use client";

import { FC, PropsWithChildren } from "react";
import NextTopLoader from "nextjs-toploader";

const Client: FC<PropsWithChildren> = ({ children }) => (
	<>
		<NextTopLoader color="#5C16C6" showSpinner={false} />
		{children}
	</>
);

export default Client;
