import { getMaps } from "@/libs/leaderboards";
import { getSEO } from "@/libs/seo";
import config from "@/config";

import Search from "./_components/Search";

export const revalidate = 3600;

export const metadata = getSEO({
	url: "/players",
	title: `${config.title} - Leaderboards`
});

const Leaderboards = async () => {
	const maps = await getMaps();

	return (
		<section className="mx-auto max-w-lg w-full flex flex-col items-center justify-center space-y-4 -mt-32">
			<h1 className="text-6xl font-bold tracking-widest gap-2 text-center">
				{maps.length} MAPS
			</h1>
			<Search maps={maps} />
		</section>
	);
};

export default Leaderboards;
