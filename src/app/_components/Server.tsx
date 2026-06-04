"use client";

import { FC } from "react";
import { Clipboard, Map, Users } from "lucide-react";
import clsx from "clsx";

import { GameServer } from "@/schemas";
import { sanitize } from "@/utils";

const Server: FC<Props> = ({ name, server, z }) => (
	<div
		className="grid grid-cols-12 bg-base-100/20 backdrop-blur-2xl rounded-box border-[3px] border-[var(--color-primary)] p-6 gap-4 w-full"
		style={{ zIndex: z }}
	>
		<div className="col-span-12 lg:col-span-3 flex items-center justify-start gap-4 size-full">
			<span
				className={clsx("size-4 rounded-full bg-primary animate-pulse", {
					"!bg-error": server.connect === "Unknown"
				})}
			/>
			<h1 className="text-2xl font-bold tracking-wider">{name}</h1>
		</div>
		<div className="col-span-12 lg:col-span-7 flex items-center justify-center gap-2 w-full">
			<div
				className="tooltip tooltip-bottom before:whitespace-pre-wrap before:content-[attr(data-tip)]"
				data-tip={
					server.players.length
						? server.players.map(player => sanitize(player.name)).join("\n")
						: "No players connected"
				}
			>
				<button className="btn btn-md btn-circle btn-ghost">
					<Users />
				</button>
			</div>
			<div className="tooltip tooltip-bottom" data-tip={server.map}>
				<button className="btn btn-md btn-circle btn-ghost">
					<Map />
				</button>
			</div>
			<div className="flex flex-wrap items-center ml-2 gap-2 h-full">
				{[...new Array(22)].map((_, i) => (
					<div
						key={i}
						className={clsx(
							"bg-primary/20 backdrop-blur-2xl rounded-box size-4 xl:h-full",
							{ "!bg-[var(--color-primary)]": !!server.players[i] }
						)}
					/>
				))}
			</div>
		</div>
		<div className="col-span-12 lg:col-span-2 flex items-center justify-start sm:justify-end gap-2">
			<div>
				<span className="text-white font-semibold text-base">{server.players.length} </span>
				<span className="text-white/30 font-normal text-sm">/ {server.maxplayers}</span>
			</div>
			<div className="tooltip tooltip-bottom" data-tip="Copy IP">
				<button className="btn btn-md btn-circle btn-ghost">
					<Clipboard onClick={() => navigator.clipboard.writeText(server.connect)} />
				</button>
			</div>
			<button
				className="btn border-none bg-linear-to-br from-[#5c16c6] to-[#9e12ca] hover:opacity-90 transition-opacity"
				onClick={() => (window.location.href = `cod4://${server.connect}`)}
			>
				Join
			</button>
		</div>
	</div>
);

type Props = {
	name: string;
	server: GameServer;
	z: number;
};

export default Server;
