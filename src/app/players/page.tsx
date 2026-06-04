import { getPBCount, getPlayers, getPlayersCount, getTopPlayers } from "@/libs/players";
import { getSEO } from "@/libs/seo";
import config from "@/config";

import Search from "./_components/Search";
import Top from "./_components/Top";

export const revalidate = 3600;

export const metadata = getSEO({
	url: "/players",
	title: `${config.title} - Players`
});

const Players = async () => {
	const players = await getPlayers();
	const playersCount = await getPlayersCount();
	const pbs = await getPBCount();
	const topPlayers = await getTopPlayers();

	return (
		<section className="relative w-full min-h-screen flex flex-col max-w-4xl mx-auto px-8 pt-28 pb-20">
			<div className="mb-12">
				<p className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium mb-3">
					Community
				</p>
				<h1 className="text-5xl font-extrabold tracking-tight text-white mb-4">Players</h1>
				<div className="flex items-center gap-6">
					<div className="flex items-baseline gap-2">
						<span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#5c16c6] to-[#9e12ca]">
							{playersCount.toLocaleString()}
						</span>
						<span className="text-xs text-white/30 uppercase tracking-widest">
							registered players
						</span>
					</div>
					<div className="w-px h-4 bg-white/10" />
					<div className="flex items-baseline gap-2">
						<span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#5c16c6] to-[#9e12ca]">
							{pbs.toLocaleString()}
						</span>
						<span className="text-xs text-white/30 uppercase tracking-widest">
							personal bests
						</span>
					</div>
				</div>
			</div>
			<div className="mb-10 max-w-sm">
				<Search players={players} />
			</div>
			<div className="mb-4 flex items-center gap-3">
				<span className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium">
					World record holders
				</span>
				<div className="flex-1 h-px bg-white/[0.05]" />
			</div>
			<Top topPlayers={topPlayers} />
		</section>
	);
};

export default Players;
