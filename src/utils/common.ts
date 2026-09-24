import { Filter } from "bad-words";

const filter = new Filter();

export const getTime = (ms: number) => {
	const min = Math.floor(ms / 60000);
	const sec = Math.floor((ms % 60000) / 1000);
	const rest = ms % 1000;
	return `${min}:${String(sec).padStart(2, "0")}.${String(rest).padStart(3, "0")}`;
};

// Records imported before dates were tracked carry the schema default instead of a real date.
const DATE_UNKNOWN = Date.UTC(2025, 0, 1);

// Fixed UTC format so server and client render the same string during hydration.
export const getDate = (date?: Date | string | null) => {
	if (!date) return "—";
	const value = new Date(date);
	if (isNaN(value.getTime()) || value.getTime() <= DATE_UNKNOWN) return "—";
	return value.toISOString().slice(0, 10);
};

export const sanitize = (value = "") => filter.clean(value);
