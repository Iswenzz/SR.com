"use client";

import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";

const AutoRefresh: FC<Props> = ({ interval }) => {
	const router = useRouter();

	useEffect(() => {
		const id = setInterval(() => {
			if (document.visibilityState === "visible") router.refresh();
		}, interval);
		return () => clearInterval(id);
	}, [router, interval]);

	return null;
};

type Props = {
	interval: number;
};

export default AutoRefresh;
