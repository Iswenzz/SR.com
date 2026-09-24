import Link from "next/link";

import { getSEO } from "@/libs/seo";

import members from "./members.json";

export const revalidate = 3600;

export const metadata = getSEO({
	url: "/members",
	title: "SR Speedrun - Members"
});

const Members = () => {
	const entries = Object.entries(members);

	return (
		<section className="relative w-full min-h-screen flex flex-col max-w-4xl mx-auto px-8 pt-28 pb-20">
			<div className="mb-12">
				<p className="text-xs text-white/50 uppercase tracking-[0.2em] font-medium mb-3">
					Hall of fame
				</p>
				<h1 className="text-5xl font-extrabold tracking-tight text-white mb-4">Members</h1>
				<p className="text-white/50 leading-relaxed max-w-xl border-l-2 border-primary/40 pl-4">
					Membership is the highest reward the community hands out. It goes to the runners
					who fought for the top spots across countless leaderboards and cleared the
					toughest challenges the mod has to offer.
				</p>
				<div className="flex items-baseline gap-2 mt-8">
					<span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#5c16c6] to-[#9e12ca]">
						{entries.length}
					</span>
					<span className="text-xs text-white/50 uppercase tracking-widest">members</span>
				</div>
			</div>
			<div className="mb-4 flex items-center gap-3">
				<span className="text-xs text-white/50 uppercase tracking-[0.2em] font-medium">
					Roster
				</span>
				<div className="flex-1 h-px bg-white/[0.05]" />
			</div>
			<ul className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-black/[0.05] border border-white/10 rounded-2xl overflow-hidden">
				{entries.map(([name, player], i) => (
					<li key={name}>
						<Link
							className="group flex items-center gap-4 h-full px-5 py-4 backdrop-blur-sm hover:bg-black/20 transition-colors"
							href={`/players/${player}`}
							aria-label={name}
						>
							<span className="text-[10px] font-mono text-white/20 tracking-widest w-6 shrink-0">
								{String(i + 1).padStart(2, "0")}
							</span>
							<span className="font-bold text-white/80 group-hover:text-white transition-colors truncate">
								{name}
							</span>
							<span className="ml-auto text-sm text-primary/0 group-hover:text-primary/60 transition-colors">
								→
							</span>
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
};

export default Members;
