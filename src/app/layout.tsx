import type { FC, PropsWithChildren } from "react";

import config from "@/config";
import { getSEO, getViewport } from "@/libs/seo";

import Navbar from "./_components/Navbar";
import Client from "./_components/Client";
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
			<Client>
				<Navbar />
				<main className="relative h-screen flex flex-col items-center p-8 pt-20">
					<div className="absolute size-1/2 rounded-full top-20 right-0 blur-[100px] bg-[conic-gradient(from_2.5rad,#5C16C6,#9E12CA)]" />
					<div className="flex container mx-auto max-w-7xl size-full z-10">
						{children}
					</div>
				</main>
			</Client>
		</body>
	</html>
);

export default RootLayout;
