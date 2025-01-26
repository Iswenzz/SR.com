import { FC, use } from "react";

import Data from "./_components/Data";
import { getEntries, getPlayers } from "../_actions/main";

export const revalidate = 3600;

const PBS: FC<Props> = ({ params, searchParams }) => {
	const { player } = use(params);
	const { type } = use(searchParams);

	const players = use(getPlayers());
	const { entries, name, wrs, wrsModded } = use(getEntries(type, player));

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
