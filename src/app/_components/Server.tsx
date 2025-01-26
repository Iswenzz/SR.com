import { FC } from "react";
import clsx from "clsx";

import { GameServer } from "@/schemas";
import ServerButtons from "./ServerButtons";

const Server: FC<Props> = ({ name, server }) => (
	<div className="grid grid-cols-8 bg-base-100/20 backdrop-blur-2xl rounded-box border-[3px] border-[#5C16C6] h-24 p-4 px-8 gap-4">
		<div className="col-span-2 flex items-center justify-start gap-4">
			<span
				className={clsx("size-4 rounded-full animate-pulse", {
					"bg-[#5C16C6]": !!server,
					"bg-error": !server
				})}
			/>
			<h1 className="text-2xl font-bold tracking-wider">{name}</h1>
		</div>
		<div className="col-span-5 flex items-center justify-center gap-2">
			<span className="mx-4 font-bold">{server.players.length}</span>
			{[...new Array(Number(server.maxplayers))].map((_, i) => (
				<div
					key={i}
					className={clsx("bg-base-100/40 backdrop-blur-2xl rounded-box h-full w-8", {
						"!bg-[#5C16C6]": !!server.players[i]
					})}
				/>
			))}
		</div>
		<div className="col-span-1 flex items-center justify-end gap-2">
			<ServerButtons server={server} />
		</div>
	</div>
);

type Props = {
	name: string;
	server: GameServer;
};

export default Server;
