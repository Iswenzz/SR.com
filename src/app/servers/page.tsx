import { getServers } from "@/libs/servers";
import { getSEO } from "@/libs/seo";

import AutoRefresh from "../_components/AutoRefresh";
import Server from "../_components/Server";

export const revalidate = 3;

export const metadata = getSEO({
	url: "/servers",
	title: "SR Speedrun - Servers"
});

const Servers = async () => {
	const servers = await getServers();

	return (
		<section className="relative w-full min-h-screen flex flex-col justify-center max-w-7xl px-8 pt-24 pb-20 overflow-hidden">
			<AutoRefresh interval={15000} />
			<div className="mb-10">
				<h1 className="text-4xl font-extrabold tracking-tight mb-2">Servers</h1>
				<p className="text-white/50 text-sm">
					Join from within Call of Duty 4 or connect directly below.
				</p>
			</div>
			<div className="flex flex-col gap-3">
				{servers.map((server, i) => (
					<Server key={server.name} server={server} z={servers.length - i} />
				))}
			</div>
		</section>
	);
};

export default Servers;
