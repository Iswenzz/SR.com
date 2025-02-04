import Data from "./_components/Data";
import { getEntries, getPlayers } from "../_actions/main";

export const revalidate = 3600;

const PBS = async ({ params, searchParams }: Props) => {
	const { player } = await params;
	const { type } = await searchParams;

	const players = await getPlayers();
	const { entries, name, wrs, wrsModded } = await getEntries(type, player);

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

export default PBS;
