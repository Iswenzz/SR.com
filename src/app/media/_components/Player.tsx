/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ReactPlayer from "react-player";

import { useSocket } from "@/hooks";

const Player = () => {
	const ref = useRef<HTMLVideoElement>(null);
	const videoEndedRef = useRef(false);
	const pendingSeekRef = useRef<number | null>(null);

	const [id, setId] = useState("");
	const [paused, setPaused] = useState(false);
	const [looped, setLooped] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const [playerKey, setPlayerKey] = useState(0);

	useSocket<State>("video", state => {
		setId(state.id);
		setLooped(state.looped);
		if (ref.current && ref.current.currentTime !== ref.current.duration) {
			const drift = Math.abs(ref.current.currentTime - state.time);
			if (drift > 2) ref.current.currentTime = state.time;
		}
	});
	useSocket<State>("video-pause", state => {
		setPaused(state.paused);
	});
	useSocket<State>("video-seek", state => {
		if (videoEndedRef.current && !state.paused) {
			pendingSeekRef.current = state.time;
			setPlayerKey(k => k + 1);
			videoEndedRef.current = false;
		} else if (ref.current) {
			ref.current.currentTime = state.time;
		}
	});
	const handleEnded = () => {
		videoEndedRef.current = true;
	};
	const handleReady = () => {
		if (pendingSeekRef.current !== null && ref.current) {
			ref.current.currentTime = pendingSeekRef.current;
			pendingSeekRef.current = null;
		}
	};

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}
	return createPortal(
		<section className="absolute top-0 left-0 h-screen w-screen bg-black z-50">
			<ReactPlayer
				key={playerKey}
				ref={ref}
				src={`https://www.youtube.com/watch?v=${id}`}
				playing={!paused}
				width="100%"
				height="100%"
				loop={looped}
				controls
				onEnded={handleEnded}
				onReady={handleReady}
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
	looped: boolean;
	mode: string;
};

export default Player;
