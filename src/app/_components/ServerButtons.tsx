"use client";

import { FC, useEffect, useState } from "react";
import { Check, Clipboard } from "lucide-react";

import { GameServer } from "@/schemas";

const ServerButtons: FC<Props> = ({ server }) => {
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		if (!copied) return;
		const timeout = setTimeout(() => setCopied(false), 2000);
		return () => clearTimeout(timeout);
	}, [copied]);

	const copy = async () => {
		await navigator.clipboard.writeText(server.connect);
		setCopied(true);
	};

	return (
		<>
			<div className="whitespace-nowrap">
				<span className="text-white font-semibold text-base">{server.players.length} </span>
				<span className="text-white/30 font-normal text-sm">/ {server.maxplayers}</span>
			</div>
			<div className="tooltip tooltip-bottom" data-tip={copied ? "Copied!" : "Copy IP"}>
				<button
					className="btn btn-md btn-circle btn-ghost"
					aria-label="Copy IP"
					onClick={copy}
				>
					{copied ? <Check className="text-success" /> : <Clipboard />}
				</button>
			</div>
			<button
				className="btn border-none bg-linear-to-br from-[#5c16c6] to-[#9e12ca] hover:opacity-90 transition-opacity"
				disabled={!server.online}
				onClick={() => (window.location.href = `cod4://${server.connect}`)}
			>
				Join
			</button>
		</>
	);
};

type Props = {
	server: GameServer;
};

export default ServerButtons;
