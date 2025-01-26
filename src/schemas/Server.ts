export type GameServer = {
	name: string;
	connect: string;
	map: string;
	maxplayers: string;
	players: Player[];
};

export type Player = {
	name?: string;
	ping?: number;
};
