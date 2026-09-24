import "server-only";

import * as fs from "fs";
import * as path from "path";

// Segments are joined into a filesystem path, so anything that could escape FASTDL is rejected.
const SEGMENT = /^[\w\-.]+$/;
const isSafeSegment = (value: string) => SEGMENT.test(value) && !value.includes("..");

export const getDemo = async (player: string, map: string, run: string) => {
	if (!process.env.FASTDL) {
		throw new Error("⚠️ FASTDL missing from .env");
	}
	if (![player, map, run].every(isSafeSegment)) return undefined;

	for (const folder of ["wrs", "demos"]) {
		const file = path.join(process.env.FASTDL, folder, player, map, run + ".dm_1");
		if (fs.existsSync(file))
			return `https://iswenzz.com/static/cod4/${folder}/${player}/${map}/${run}.dm_1`;
	}
	return undefined;
};
