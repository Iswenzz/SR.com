import { use } from "react";

import { queryServers } from "./_actions/main";
import Server from "./_components/Server";

const Home = () => {
	const servers = use(queryServers());

	return (
		<main className="relative h-screen flex flex-col items-center justify-center p-8">
			<div className="absolute size-1/2 rounded-full top-20 right-0 blur-[100px] bg-[conic-gradient(from_2.5rad,#5C16C6,#9E12CA)]" />
			<div className="container mx-auto max-w-7xl w-full space-y-8 z-10">
				<Server name="SR Speedrun" server={servers[0]} />
				<Server name="SR Deathrun" server={servers[1]} />
				<Server name="SR BattleRoyale" server={servers[2]} />
			</div>
		</main>
	);
};

export default Home;
