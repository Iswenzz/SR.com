import "server-only";

import * as fs from "fs";
import * as path from "path";

export const getDemo = async (player: string, map: string, run: string) => {
	if (!process.env.FASTDL) {
		throw new Error("⚠️ FASTDL missing from .env");
	}
	const wrs = path.join(process.env.FASTDL as string, "wrs");
	const demos = path.join(process.env.FASTDL as string, "demos");

	if (fs.existsSync(path.join(wrs, player, map, run + ".dm_1")))
		return `https://iswenzz.com/static/fastdl/wrs/${player}/${map}/${run}.dm_1`;
	if (fs.existsSync(path.join(demos, player, map, run + ".dm_1")))
		return `https://iswenzz.com/static/fastdl/demos/${player}/${map}/${run}.dm_1`;
	return undefined;
};
