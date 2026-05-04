"use client";

import { FC } from "react";

import { Table } from "@/components";

import { topPlayersColumns } from "./Columns";

const Top: FC<Props> = ({ topPlayers }) => {
	const sorted = [...topPlayers].sort((a, b) => b.wrs - a.wrs);

	return (
		<div className="w-full max-w-5xl mx-auto">
			<Table
                className="max-h-[75vh]"
                data={sorted}
                columns={topPlayersColumns}
            />
		</div>
	);
};

type Props = {
	topPlayers: {
        player: string;
        name: string;
        wrs: number;
        wrsModded: number;
    }[];
};

export default Top;
