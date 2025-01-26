export const getTime = (ms: number) => {
	const min = Math.floor(ms / 60000);
	ms %= 60000;
	const sec = Math.floor(ms / 1000);
	ms %= 1000;
	return `${min}:${sec}.${ms}`;
};
