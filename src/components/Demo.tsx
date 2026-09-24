"use client";

import { FC } from "react";
import { useMutation } from "@tanstack/react-query";
import { Download, FileX } from "lucide-react";
import clsx from "clsx";

import { Leaderboard } from "@/generated/prisma/client";

const Demo: FC<Props> = ({ entry }) => {
	const {
		mutate: download,
		isError,
		isPending
	} = useMutation({
		mutationFn: async () => {
			const params = new URLSearchParams({
				player: entry.player,
				map: entry.map,
				run: entry.run
			});
			const response = await fetch(`/api/demos?${params}`);
			if (!response.ok) throw new Error();
			return response.json();
		},
		// window.open after an await is no longer a user gesture and gets popup-blocked.
		onSuccess: url => window.location.assign(url)
	});

	return (
		<div className="ml-4 tooltip tooltip-bottom" data-tip={isError ? "Missing" : "Download"}>
			<button
				className={clsx("btn btn-md btn-circle btn-ghost", {
					"btn-disabled": isError || isPending
				})}
				aria-label={isError ? "Demo missing" : "Download demo"}
				onClick={() => download()}
			>
				{isError ? (
					<FileX className="text-red-400" />
				) : (
					<Download className="text-[#2baeff]" />
				)}
			</button>
		</div>
	);
};

type Props = {
	entry: Leaderboard;
};

export default Demo;
