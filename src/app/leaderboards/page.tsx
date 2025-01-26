import { use } from "react";

import Search from "./_components/Search";
import { getMaps } from "./_actions/main";

const Leaderboards = () => {
	const maps = use(getMaps());

	return (
		<section className="flex flex-col flex-auto items-center justify-center space-y-4 -mt-32">
			<h1 className="text-6xl font-bold tracking-widest">{maps.length} MAPS</h1>
			<Search className="w-96" maps={maps} />
		</section>
	);
};

export default Leaderboards;
