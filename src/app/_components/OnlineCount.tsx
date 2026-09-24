"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import clsx from "clsx";

import { GameServer } from "@/schemas";

const OnlineCount = () => {
	const { data: servers } = useQuery<GameServer[]>({
		queryKey: ["servers"],
		queryFn: async () => {
			const response = await fetch("/api/servers");
			if (!response.ok) throw new Error();
			return response.json();
		},
		refetchInterval: 30000
	});

	const online = servers?.filter(server => server.online) ?? [];
	const players = online.reduce((count, server) => count + server.players.length, 0);
	const label = !servers
		? "Checking servers"
		: online.length
			? `${players} ${players === 1 ? "player" : "players"} online`
			: "Servers offline";

	return (
		<Link href="/servers" className="flex items-center gap-2 group">
			<span
				className={clsx("w-1.5 h-1.5 rounded-full", {
					"bg-primary animate-pulse": !servers || online.length,
					"bg-error": servers && !online.length
				})}
			/>
			<span className="text-sm text-white/50 tracking-wide group-hover:text-white transition-colors">
				{label}
			</span>
		</Link>
	);
};

export default OnlineCount;
