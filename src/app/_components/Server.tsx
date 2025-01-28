import { FC } from "react";
import { Map, Users } from "lucide-react";
import clsx from "clsx";

import { GameServer } from "@/schemas";

import ServerButtons from "./ServerButtons";

const Server: FC<Props> = ({ name, server, z }) => (
	<div
		className="grid grid-cols-8 bg-base-100/20 backdrop-blur-2xl rounded-box border-[3px] border-[#5C16C6] p-6 gap-4 w-full"
		style={{ zIndex: z }}
	>
		<div className="col-span-8 lg:col-span-2 flex items-center justify-start gap-4 size-full">
			<span
				className={clsx("size-4 rounded-full bg-[#5C16C6] animate-pulse", {
					"!bg-error": server.connect === "Unknown"
				})}
			/>
			<h1 className="text-2xl font-bold tracking-wider">{name}</h1>
		</div>
		<div className="col-span-8 lg:col-span-5 flex items-center justify-center gap-2 w-full">
			<div
				className="tooltip tooltip-bottom before:whitespace-pre-wrap before:content-[attr(data-tip)]"
				data-tip={
					server.players.length
						? server.players.map(player => player.name).join("\n")
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
				{[...new Array(Number(server.maxplayers))].map((_, i) => (
					<div
						key={i}
						className={clsx(
							"bg-base-100/40 backdrop-blur-2xl rounded-box size-4 xl:h-full",
							{ "!bg-[#5C16C6]": !!server.players[i] }
						)}
					/>
				))}
			</div>
		</div>
		<div className="col-span-8 lg:col-span-1 flex items-center justify-start sm:justify-end gap-2">
			<ServerButtons server={server} />
		</div>
	</div>
);

type Props = {
	name: string;
	server: GameServer;
	z: number;
};

export default Server;
