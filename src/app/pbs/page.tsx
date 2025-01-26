import { use } from "react";

import Search from "./_components/Search";
import { getCount, getPlayers } from "./_actions/main";

const PBS = () => {
	const players = use(getPlayers());
	const count = use(getCount());

	return (
		<section className="flex flex-col flex-auto items-center justify-center space-y-4 -mt-32">
			<h1 className="text-6xl font-bold tracking-widest gap-2">{count} PBS</h1>
			<Search className="w-96" players={players} />
		</section>
	);
};

export default PBS;
