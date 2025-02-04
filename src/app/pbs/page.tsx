import Search from "./_components/Search";
import { getCount, getPlayers } from "./_actions/main";

export const revalidate = 3600;

const PBS = async () => {
	const players = await getPlayers();
	const count = await getCount();

	return (
		<section className="mx-auto max-w-lg w-full flex flex-col items-center justify-center space-y-4 -mt-32">
			<h1 className="text-6xl font-bold tracking-widest gap-2 text-center">{count} PBS</h1>
			<Search players={players} />
		</section>
	);
};

export default PBS;
