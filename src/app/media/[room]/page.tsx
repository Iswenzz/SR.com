import Player from "../_components/Player";

const Media = async ({ params }: Props) => {
	const { room } = await params;
	return <Player room={room} />;
};

type Props = {
	params: Promise<{ room: string }>;
};

export default Media;
