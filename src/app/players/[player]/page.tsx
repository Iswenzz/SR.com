import { notFound } from "next/navigation";

import { getPlayerEntries, getPlayers } from "@/libs/players";
import { getSEO } from "@/libs/seo";
import { sanitize } from "@/utils";

import Data from "./_components/Data";

export const revalidate = 3600;

export const generateMetadata = async ({ params, searchParams }: Props) => {
	const { player } = await params;
	const { type } = await searchParams;
	const { name, pbs, wrs, wrms } = await getPlayerEntries(type, player);
	const display = name ? sanitize(name) : "Player";
	return getSEO({
		url: `/players/${player}`,
		title: `SR Speedrun - ${display}`,
		description: `${display}: ${wrs} world records, ${wrms} modded world records and ${pbs} personal bests on SR Speedrun.`
	});
};

const Players = async ({ params, searchParams }: Props) => {
	const { player } = await params;
	const { type } = await searchParams;

	const [{ entries, name, pbs, wrs, wrms }, players] = await Promise.all([
		getPlayerEntries(type, player),
		getPlayers()
	]);
	// An empty list means the database is unreachable, which should not look like a missing player.
	if (players.length && !name && !pbs) notFound();

	return (
		<section className="relative w-full min-h-screen flex flex-col max-w-7xl mx-auto px-4 sm:px-8 pt-28 pb-20">
			<Data
				type={type}
				name={name}
				player={player}
				players={players.map(({ name, player }) => ({ name, player }))}
				entries={entries}
				pbs={pbs}
				wrs={wrs}
				wrms={wrms}
			/>
		</section>
	);
};

type Props = {
	params: Promise<{ player: string }>;
	searchParams: Promise<{ type?: string }>;
};

export default Players;
