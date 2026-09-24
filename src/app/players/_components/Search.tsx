"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";

import { Player } from "@/generated/prisma/client";
import { Select } from "@/components";
import { sanitize } from "@/utils";

const Search: FC<Props> = ({ player, players }) => {
	const router = useRouter();

	return (
		<Select
			name="player"
			options={players.filter(player => player.name.length)}
			value={player}
			onChange={player => router.push(`/players/${player}`)}
			getLabel={player => sanitize(player.name)}
			getValue={player => player.player}
		/>
	);
};

export type SearchPlayer = Pick<Player, "name" | "player">;

type Props = {
	player?: string;
	players: SearchPlayer[];
};

export default Search;
