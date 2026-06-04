import { getPlayerEntries, getPlayers } from "@/libs/players";

import Data from "./_components/Data";

export const revalidate = 3600;

const Players = async ({ params, searchParams }: Props) => {
	const { player } = await params;
	const { type } = await searchParams;

	const { entries, name, wrs, wrms } = await getPlayerEntries(type, player);
	const players = await getPlayers();

	return (
		<section className="relative w-full min-h-screen flex flex-col max-w-7xl mx-auto px-8 pt-28 pb-20">
			<Data
				type={type}
				name={name}
				player={player}
				players={players}
				entries={entries}
				wrs={wrs}
				wrms={wrms}
			/>
		</section>
	);
};

type Props = {
	params: Promise<{ player: string }>;
	searchParams: Promise<{ type: string }>;
};

export default Players;
