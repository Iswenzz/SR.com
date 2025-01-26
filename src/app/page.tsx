import { use } from "react";

import { queryServers } from "./_actions/main";
import Server from "./_components/Server";

export const revalidate = 30;

const Home = () => {
	const servers = use(queryServers());

	return (
		<section className="flex flex-col flex-auto items-center justify-center space-y-8">
			<Server name="SR Speedrun" server={servers[0]} />
			<Server name="SR Deathrun" server={servers[1]} />
			<Server name="SR BattleRoyale" server={servers[2]} />
		</section>
	);
};

export default Home;
