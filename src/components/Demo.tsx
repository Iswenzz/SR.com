"use client";

import { FC } from "react";
import { Leaderboard } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { Download, FileX } from "lucide-react";
import clsx from "clsx";

const Demo: FC<Props> = ({ entry }) => {
	const { mutate: download, isError } = useMutation({
		mutationFn: async () => {
			const response = await fetch(
				`/api/demos?player=${entry.player}&map=${entry.map}&run=${entry.run}`
			);
			if (!response.ok) throw new Error();
			return response.json();
		},
		onSuccess: url => window.open(url, "_blank")
	});

	return (
		<div className="ml-4 tooltip tooltip-bottom" data-tip={isError ? "Missing" : "Download"}>
			<button
				className={clsx("btn btn-md btn-circle btn-ghost", {
					"btn-disabled": isError
				})}
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
