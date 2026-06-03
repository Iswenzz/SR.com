import { Filter } from "bad-words";

const filter = new Filter();

export const getTime = (ms: number) => {
	const min = Math.floor(ms / 60000);
	ms %= 60000;
	const sec = Math.floor(ms / 1000);
	ms %= 1000;
	return `${min}:${sec}.${ms}`;
};

export const sanitize = (value = "") => filter.clean(value);
