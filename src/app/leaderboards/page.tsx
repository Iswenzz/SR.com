import Link from "next/link";
import Image from "next/image";

import { getMaps, getRecentWorldRecords } from "@/libs/leaderboards";
import { getSEO } from "@/libs/seo";
import config from "@/config";
import { getTime, sanitize } from "@/utils";

import Search from "./_components/Search";

export const revalidate = 3600;

export const metadata = getSEO({
	url: "/leaderboards",
	title: `${config.title} - Leaderboards`
});

const Leaderboards = async () => {
	const maps = await getMaps();
	const recentWRs = await getRecentWorldRecords();

	return (
		<section className="relative w-full min-h-screen flex flex-col max-w-4xl mx-auto px-8 pt-28 pb-20">
			<div className="mb-12">
				<p className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium mb-3">
					Compete
				</p>
				<h1 className="text-5xl font-extrabold tracking-tight text-white mb-4">
					Leaderboards
				</h1>
				<div className="flex items-center gap-6">
					<div className="flex items-baseline gap-2">
						<span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#5c16c6] to-[#9e12ca]">
							{maps.length}
						</span>
						<span className="text-xs text-white/30 uppercase tracking-widest">
							maps available
						</span>
					</div>
					<div className="w-px h-4 bg-white/10" />
					<div className="flex items-baseline gap-2">
						<span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#5c16c6] to-[#9e12ca]">
							7
						</span>
						<span className="text-xs text-white/30 uppercase tracking-widest">
							movement modes
						</span>
					</div>
				</div>
				<p className="text-sm text-white/30 max-w-md leading-relaxed mt-5 border-l-2 border-primary/40 pl-4">
					Every map has its own leaderboard broken down by movement style and mode. Search
					for a map below to view rankings, compare times, and download world record
					demos.
				</p>
			</div>
			<div className="mb-4 flex items-center gap-3">
				<span className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium">
					Select a map
				</span>
				<div className="flex-1 h-px bg-white/[0.05]" />
			</div>
			<Search maps={maps} />
			<div className="mt-10">
				<div className="mb-4 flex items-center gap-3">
					<span className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium">
						Recent world records
					</span>
					<div className="flex-1 h-px bg-white/[0.05]" />
				</div>
				<div className="flex flex-col gap-px bg-black/5 rounded-2xl overflow-hidden border border-white/[0.06]">
					{recentWRs.map(entry => (
						<Link
							key={entry.id}
							href={`/leaderboards/${entry.map}?mode=${entry.mode}&way=${entry.way}`}
							className="flex items-center justify-between px-5 py-3.5 backdrop-blur-sm hover:bg-black/20 transition-colors group"
						>
							<div className="flex items-center gap-4">
								<Image
									src="/images/trophy_gold.png"
									alt="Trophy"
									width={30}
									height={30}
									priority
								/>
								<span className="font-mono text-xs text-white/50 group-hover:text-white/70 transition-colors">
									{entry.map}
								</span>
							</div>
							<div className="grid grid-cols-[80px_120px_100px_100px_120px] items-center">
								<span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-primary/15 text-primary border border-primary/20 w-fit">
									{entry.mode}
								</span>
								<span className="text-xs text-white/25 font-mono">{entry.way}</span>
								<span className="font-mono text-sm font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#5c16c6] to-[#9e12ca]">
									{getTime(entry.time)}
								</span>
								<span className="text-xs text-white/20 font-mono">
									{new Date(entry.date).toLocaleDateString()}
								</span>
								<span className="text-xs font-semibold text-white/40 group-hover:text-white transition-colors">
									{sanitize(entry.name)}
								</span>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
};

export default Leaderboards;
