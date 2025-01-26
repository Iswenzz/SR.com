import type { FC, PropsWithChildren } from "react";

import config from "@/config";
import { getSEO, getViewport } from "@/libs/seo";

import Navbar from "./_components/Navbar";
import { roboto } from "./fonts";

import "./globals.css";

export const viewport = getViewport();

export const metadata = getSEO({
	url: "/",
	title: "Speedrun"
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
	<html lang="en" data-theme={config.theme}>
		<body className={roboto.className}>
			<Navbar />
			{children}
		</body>
	</html>
);

export default RootLayout;
