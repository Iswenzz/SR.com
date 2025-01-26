"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { Select } from "@/components";
import { useForm } from "@/hooks";

const schema = z.object({
	map: z.string()
});

const Search: FC<Props> = ({ className, map, maps }) => {
	const router = useRouter();
	const form = useForm(schema);

	return (
		<Select
			formClassName={className}
			name="map"
			options={maps}
			defaultValue={map}
			onClickOption={map => router.push(`/leaderboards/${map}`)}
			form={form}
		/>
	);
};

type Props = {
	className?: string;
	map?: string;
	maps: string[];
};

export default Search;
