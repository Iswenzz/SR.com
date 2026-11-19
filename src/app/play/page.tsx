import { FC } from "react";
import Link from "next/link";

import { getSEO } from "@/libs/seo";

export const metadata = getSEO({
	url: "/play",
	title: "SR Speedrun - Play"
});

const Play = () => (
	<section className="relative w-full min-h-screen flex flex-col max-w-4xl mx-auto px-8 pt-28 pb-20">
		<div className="mb-10">
			<h1 className="text-4xl font-extrabold tracking-tight mb-2">How to play</h1>
			<p className="text-white/40">Everything you need to get started on SR servers.</p>
		</div>
		<div className="flex flex-col gap-3">
			<Step number={1} title="Own Call of Duty 4: Modern Warfare">
				SR runs on the original CoD4 (version 1.7). You must own a legitimate copy of the
				game to connect to SR servers.
			</Step>
			<div className="border border-purple-500/50 bg-purple-500/[0.06] rounded-2xl p-5">
				<div className="flex items-start gap-4">
					<div className="min-w-[32px] h-8 rounded-lg bg-purple-500/50 border border-purple-500/35 flex items-center justify-center font-bold text-purple-300">
						2
					</div>
					<div className="flex-1">
						<div className="font-bold text-base mb-2">Install IW3SR</div>
						<p className="text-white/50 leading-relaxed mb-5">
							IW3SR is a custom CoD4 client built specifically for SR. It delivers
							smoother movement across all custom physics modes and includes a
							built-in browser with video playback, letting you watch runs and
							community videos without leaving the game. In order to use this client,
							download the archived file down below, and extract it to your cod4
							directory.
						</p>
						<Link
							href="https://github.com/Iswenzz/IW3SR/releases/latest/download/IW3SR.zip"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold bg-linear-to-br from-[#5c16c6] to-[#9e12ca] hover:opacity-90 transition-opacity"
						>
							Download
						</Link>
					</div>
				</div>
			</div>
			<Step number={3} title="Install CoD4x" badge="Optional">
				CoD4x is a community client patch that fixes base game bugs. You can play with
				IW3SR, CoD4x, or both at the same time.{" "}
				<Link
					href="https://cod4x.ovh"
					target="_blank"
					rel="noopener noreferrer"
					className="text-purple-400 hover:text-purple-300 transition-colors"
				>
					cod4x.ovh →
				</Link>
			</Step>
			<Step number={4} title="Join an SR server">
				Find SR servers through the in-game server browser, or jump in directly from the
				server page.{" "}
				<Link
					href="/servers"
					className="text-purple-400 hover:text-purple-300 transition-colors"
				>
					View servers →
				</Link>
			</Step>
		</div>
	</section>
);

const Step: FC<StepProps> = ({ number, title, badge, children }) => (
	<div className="border border-white/[0.06] bg-white/[0.02] rounded-2xl p-5 flex items-start gap-4 hover:border-white/10 transition-colors">
		<div className="min-w-[32px] h-8 rounded-lg bg-purple-500/15 border border-purple-500/50 flex items-center justify-center font-bold text-purple-400">
			{number}
		</div>
		<div>
			<div className="flex items-center gap-3 mb-1.5 flex-wrap">
				<span className="font-bold text-base">{title}</span>
				{badge && (
					<span className="px-2.5 py-0.5 rounded-full font-semibold bg-white/[0.04] border border-white/10 text-white/50">
						{badge}
					</span>
				)}
			</div>
			<p className="text-white/45 leading-relaxed">{children}</p>
		</div>
	</div>
);

type StepProps = {
	number: number;
	title: string;
	badge?: string;
	children: React.ReactNode;
};

export default Play;
