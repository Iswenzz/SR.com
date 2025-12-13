import { getPBs, getPlayers } from "@/libs/players";

import Search from "./_components/Search";

export const revalidate = 3600;

const PBS = async () => {
	const players = await getPlayers();
	const pbs = await getPBs();

	return (
		<section className="mx-auto max-w-lg w-full flex flex-col items-center justify-center space-y-4 -mt-32">
			<h1 className="text-6xl font-bold tracking-widest gap-2 text-center">
				{players.length} PLAYERS
			</h1>
			<h2 className="text-2xl font-bold tracking-widest gap-2 text-center">{pbs} PBS</h2>
			<Search players={players} />
		</section>
	);
};

export default PBS;
