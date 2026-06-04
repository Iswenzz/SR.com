import { getServers } from "@/libs/servers";

import Server from "../_components/Server";

export const revalidate = 3;

const Home = async () => {
	const servers = await getServers();

	return (
		<section className="relative w-full min-h-screen flex flex-col justify-center max-w-7xl px-8 pt-24 pb-20 overflow-hidden">
			<div className="mb-10">
				<h1 className="text-4xl font-extrabold tracking-tight mb-2">Servers</h1>
				<p className="text-white/40 text-sm">
					Join from within Call of Duty 4 or connect directly below.
				</p>
			</div>
			<div className="flex flex-col gap-3">
				<Server name="SR Speedrun" server={servers[0]} z={2} />
				<Server name="SR Deathrun" server={servers[1]} z={1} />
				<Server name="SR BattleRoyale" server={servers[2]} z={0} />
			</div>
		</section>
	);
};

export default Home;
