import type { FC, PropsWithChildren } from "react";

import config from "@/config";
import { getSEO, getViewport } from "@/libs/seo";

import Navbar from "./_components/Navbar";
import Client from "./_components/Client";
import Footer from "./_components/Footer";
import { syne } from "./fonts";

import "./globals.css";

export const viewport = getViewport();

export const metadata = getSEO({
	url: "/",
	title: "SR Speedrun - CoD4 Competitive Speedrunning"
});

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	name: config.title,
	alternateName: "SR",
	url: config.url
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
	<html lang="en" data-theme={config.theme}>
		<body className={syne.className}>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<Client>
				<Navbar />
				<main className="relative flex flex-col items-center">
					<div className="fixed inset-0 overflow-hidden pointer-events-none">
						<div className="absolute size-1/2 rounded-full top-20 -right-40 blur-[100px] bg-[conic-gradient(from_2.5rad,var(--color-primary),var(--color-secondary))] opacity-80" />
						<div className="absolute size-1/2 rounded-full bottom-20 -left-40 blur-[100px] bg-[conic-gradient(from_2.5rad,var(--color-secondary),var(--color-primary))] opacity-60" />
					</div>
					<div
						className="fixed inset-0 pointer-events-none opacity-[0.04]"
						style={{
							backgroundImage:
								"repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 3px)",
							backgroundSize: "100% 4px"
						}}
					/>
					{children}
				</main>
				<Footer />
			</Client>
		</body>
	</html>
);

export default RootLayout;
