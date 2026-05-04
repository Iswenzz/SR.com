import { getPBs, getPlayers, getTopPlayers } from "@/libs/players";
import { getSEO } from "@/libs/seo";
import config from "@/config";

import Search from "./_components/Search";
import Top from "./_components/Top";

export const revalidate = 3600;

export const metadata = getSEO({
	url: "/players",
	title: `${config.title} - Players`
});

const PBS = async () => {
	const players = await getPlayers();
	const pbs = await getPBs();
	const topPlayers = await getTopPlayers();

	return (
		<section className="flex flex-col items-center w-full space-y-12">
			<div className="mx-auto max-w-lg w-full flex flex-col items-center justify-center space-y-4">
				<h1 className="text-6xl font-bold tracking-widest gap-2 text-center">
					{players.length} PLAYERS
				</h1>
				<h2 className="text-2xl font-bold tracking-widest gap-2 text-center">
					{pbs} PBS
				</h2>
				<Search players={players} />
			</div>
			<Top topPlayers={topPlayers} />
		</section>
	);
};

export default PBS;
