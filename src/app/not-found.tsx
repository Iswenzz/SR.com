import Link from "next/link";

import { getSEO } from "@/libs/seo";

export const metadata = getSEO({
	url: "/404",
	title: "SR Speedrun - Not found",
	extra: { robots: { index: false } }
});

const NotFound = () => (
	<section className="relative w-full min-h-screen flex flex-col items-start justify-center max-w-4xl mx-auto px-8 pt-28 pb-20">
		<p className="text-xs text-white/50 uppercase tracking-[0.2em] font-medium mb-3">404</p>
		<h1 className="text-5xl font-extrabold tracking-tight text-white mb-4">Out of bounds</h1>
		<p className="text-white/50 leading-relaxed max-w-xl border-l-2 border-primary/40 pl-4 mb-10">
			This page, map or player doesn&apos;t exist. It may have been renamed, or the link is
			wrong.
		</p>
		<div className="flex flex-wrap gap-3">
			<Link
				href="/"
				className="inline-flex items-center px-5 py-2.5 rounded-lg bg-linear-to-br from-[#5c16c6] to-[#9e12ca] text-white font-bold text-sm tracking-wide hover:opacity-90 transition-opacity uppercase"
			>
				Home
			</Link>
			<Link
				href="/leaderboards"
				className="inline-flex items-center px-5 py-2.5 rounded-lg border border-white/10 text-white/70 font-bold text-sm tracking-wide hover:text-white hover:border-white/20 transition-colors uppercase"
			>
				Leaderboards
			</Link>
			<Link
				href="/players"
				className="inline-flex items-center px-5 py-2.5 rounded-lg border border-white/10 text-white/70 font-bold text-sm tracking-wide hover:text-white hover:border-white/20 transition-colors uppercase"
			>
				Players
			</Link>
		</div>
	</section>
);

export default NotFound;
