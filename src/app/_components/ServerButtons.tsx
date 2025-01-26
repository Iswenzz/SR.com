"use client";

import { FC } from "react";
import { Clipboard, Gamepad2 } from "lucide-react";

import { GameServer } from "@/schemas";

const ServerButtons: FC<Props> = ({ server }) => (
	<>
		<button className="btn btn-md btn-circle btn-ghost" title="Copy IP">
			<Clipboard onClick={() => navigator.clipboard.writeText(server.connect)} />
		</button>
		<button className="btn btn-md btn-circle btn-ghost" title="Connect">
			<Gamepad2 onClick={() => (window.location.href = `cod4://${server.connect}`)} />
		</button>
	</>
);

type Props = {
	server: GameServer;
};

export default ServerButtons;
