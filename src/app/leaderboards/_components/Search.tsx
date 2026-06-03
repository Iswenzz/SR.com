"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";

import { Select } from "@/components";

const Search: FC<Props> = ({ map, maps }) => {
	const router = useRouter();

	return (
		<Select
			name="map"
			options={maps}
			value={map}
			onChange={map => router.push(`/leaderboards/${map}`)}
		/>
	);
};

type Props = {
	map?: string;
	maps: string[];
};

export default Search;
