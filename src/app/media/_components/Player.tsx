/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ReactPlayer from "react-player";

import { useSocket } from "@/hooks";

const Player = () => {
	const ref = useRef<HTMLVideoElement>(null);

	const [id, setId] = useState("");
	const [paused, setPaused] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	useSocket<State>("video", state => {
		setId(state.id);
		if (ref.current && ref.current.currentTime !== ref.current.duration) {
			const drift = Math.abs(ref.current.currentTime - state.time);
			if (drift > 2) ref.current.currentTime = state.time;
		}
	});
	useSocket<State>("video-pause", state => {
		setPaused(state.paused);
	});
	useSocket<State>("video-seek", state => {
		if (ref.current) ref.current.currentTime = state.time;
	});
	useSocket<State>("shorts-next", state => {
		setId(state.id);
	});
	useSocket<State>("shorts-prev", state => {
		setId(state.id);
	});

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}
	return createPortal(
		<section className="absolute top-0 left-0 h-screen w-screen bg-black z-50">
			<ReactPlayer
				ref={ref}
				src={`https://www.youtube.com/watch?v=${id}`}
				playing={!paused}
				width="100%"
				height="100%"
				controls={false}
			/>
		</section>,
		document.body
	);
};

type State = {
	type: string;
	id: string;
	index: number;
	time: number;
	paused: boolean;
};

export default Player;
