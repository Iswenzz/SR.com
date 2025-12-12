import { fetchJson } from "@/libs/api";
import { GameServer } from "@/schemas";

import Server from "./_components/Server";

const Home = async () => {
	const servers = await fetchJson<GameServer[]>("/api/servers");

	return (
		<section className="mx-auto flex flex-col items-center justify-center space-y-8">
			<Server name="SR Speedrun" server={servers[0]} z={2} />
			<Server name="SR Deathrun" server={servers[1]} z={1} />
			<Server name="SR BattleRoyale" server={servers[2]} z={0} />
		</section>
	);
};

export default Home;
