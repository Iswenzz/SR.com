"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { Select } from "@/components";
import { useForm } from "@/hooks";

const schema = z.object({
	player: z.string()
});

const Search: FC<Props> = ({ player, players }) => {
	const router = useRouter();
	const form = useForm(schema);

	return (
		<Select
			name="player"
			options={players}
			defaultValue={player}
			onClickOption={player => router.push(`/pbs/${player}`)}
			form={form}
		/>
	);
};

type Props = {
	player?: string;
	players: string[];
};

export default Search;
