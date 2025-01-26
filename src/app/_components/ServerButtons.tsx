"use client";

import { FC } from "react";
import { Clipboard, Gamepad2 } from "lucide-react";

import { GameServer } from "@/schemas";

const ServerButtons: FC<Props> = ({ server }) => (
	<>
		<div className="tooltip tooltip-bottom" data-tip="Copy IP">
			<button className="btn btn-md btn-circle btn-ghost">
				<Clipboard onClick={() => navigator.clipboard.writeText(server.connect)} />
			</button>
		</div>
		<div className="tooltip tooltip-bottom" data-tip="Connect">
			<button className="btn btn-md btn-circle btn-ghost">
				<Gamepad2 onClick={() => (window.location.href = `cod4://${server.connect}`)} />
			</button>
		</div>
	</>
);

type Props = {
	server: GameServer;
};

export default ServerButtons;
