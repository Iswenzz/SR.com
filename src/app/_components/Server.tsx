import { FC } from "react";
import { Map, Users } from "lucide-react";
import clsx from "clsx";

import { GameServer } from "@/schemas";
import { sanitize } from "@/utils";

import ServerButtons from "./ServerButtons";

const Server: FC<Props> = ({ server, z }) => {
	const slots = Math.min(Number(server.maxplayers) || 24, 64);

	return (
		<div
			className="grid grid-cols-12 bg-base-100/20 backdrop-blur-2xl rounded-box border-[3px] border-[var(--color-primary)] p-6 gap-4 w-full"
			style={{ zIndex: z }}
		>
			<div className="col-span-12 lg:col-span-3 flex items-center justify-start gap-4 size-full">
				<span
					className={clsx("size-4 rounded-full bg-primary", {
						"animate-pulse": server.online,
						"!bg-error": !server.online
					})}
					title={server.online ? "Online" : "Offline"}
				/>
				<h2 className="text-2xl font-bold tracking-wider">{server.name}</h2>
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
					<button className="btn btn-md btn-circle btn-ghost" aria-label="Players">
						<Users />
					</button>
				</div>
				<div className="tooltip tooltip-bottom" data-tip={server.map}>
					<button className="btn btn-md btn-circle btn-ghost" aria-label="Map">
						<Map />
					</button>
				</div>
				<div className="flex flex-wrap items-center ml-2 gap-2 h-full">
					{[...new Array(slots)].map((_, i) => (
						<div
							key={i}
							className={clsx(
								"bg-primary/20 backdrop-blur-2xl rounded-box size-4 xl:h-full",
								{ "bg-(--color-primary)!": !!server.players[i] }
							)}
						/>
					))}
				</div>
			</div>
			<div className="col-span-12 lg:col-span-2 flex items-center justify-start sm:justify-end gap-2">
				<ServerButtons server={server} />
			</div>
		</div>
	);
};

type Props = {
	server: GameServer;
	z: number;
};

export default Server;
