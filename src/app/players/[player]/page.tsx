import { getEntries, getPlayers } from "@/libs/players";

import Data from "./_components/Data";

export const revalidate = 3600;

const Players = async ({ params, searchParams }: Props) => {
	const { player } = await params;
	const { type } = await searchParams;

	const { entries, name, wrs, wrsModded } = await getEntries(type, player);
	const players = await getPlayers();

	return (
		<Data
			type={type}
			name={name}
			player={player}
			players={players}
			entries={entries}
			wrs={wrs}
			wrsModded={wrsModded}
		/>
	);
};

type Props = {
	params: Promise<{ player: string }>;
	searchParams: Promise<{ type: string }>;
};

export default Players;
