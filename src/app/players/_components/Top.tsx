"use client";

import { FC, useMemo } from "react";

import { Table } from "@/components";

import { topPlayersColumns } from "./Columns";

const Top: FC<Props> = ({ topPlayers }) => {
	const ranked = useMemo(
		() => topPlayers.map((player, i) => ({ ...player, rank: i + 1 })),
		[topPlayers]
	);

	return (
		<div className="w-full max-w-5xl mx-auto">
			<Table
				className="max-h-[75vh]"
				data={ranked}
				columns={topPlayersColumns}
				search={player => player.name}
			/>
		</div>
	);
};

type Props = {
	topPlayers: {
		player: string;
		name: string;
		wrs: number;
		wrms: number;
	}[];
};

export default Top;
