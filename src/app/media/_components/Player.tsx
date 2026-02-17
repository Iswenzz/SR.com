/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ReactPlayer from "react-player";

import { useSocket } from "@/hooks";

const Player = () => {
	const ref = useRef<HTMLVideoElement>(null);
	const videoEndedRef = useRef(false);
	const pendingSeekRef = useRef<Nullable<number>>(null);
	const serverTimeRef = useRef<number>(0);
	const serverTimestampRef = useRef<number>(0);

	const [type, setType] = useState("");
	const [id, setId] = useState("");
	const [paused, setPaused] = useState(false);
	const [looped, setLooped] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const [playerKey, setPlayerKey] = useState(0);

	const getSeekTime = (time: number, isLooped: boolean, duration?: number) => {
		return isLooped && duration ? time % duration : time;
	};

	const handleEnded = () => {
		videoEndedRef.current = true;
	};

	const handleReady = () => {
		if (pendingSeekRef.current !== null && ref.current) {
			if (!looped && pendingSeekRef.current >= ref.current.duration) {
				ref.current.currentTime = ref.current.duration;
				pendingSeekRef.current = null;
				videoEndedRef.current = true;
				return;
			}
			ref.current.currentTime = getSeekTime(
				pendingSeekRef.current,
				looped,
				ref.current.duration
			);
			pendingSeekRef.current = null;
		}
	};

	useSocket<State>("video", state => {
		if (state.type === "telegram") setPlayerKey(k => k + 1);
		setType(state.type);
		setId(state.id);
		setLooped(state.looped);
		setPaused(state.paused);
		pendingSeekRef.current = state.time;
		serverTimeRef.current = state.time;
		serverTimestampRef.current = Date.now();
		videoEndedRef.current = false;
	});

	useSocket<State>("video-pause", state => {
		setPaused(state.paused);
		serverTimeRef.current = state.time;
		serverTimestampRef.current = Date.now();
	});

	useSocket<State>("video-seek", state => {
		if (!ref.current) return;
		serverTimeRef.current = state.time;
		serverTimestampRef.current = Date.now();
		if (!state.looped && state.time >= ref.current.duration) {
			ref.current.currentTime = ref.current.duration;
			videoEndedRef.current = true;
			return;
		}
		const seekTime = getSeekTime(state.time, state.looped, ref.current.duration);
		if (videoEndedRef.current && !state.paused) {
			videoEndedRef.current = false;
			if (state.looped) {
				ref.current.currentTime = seekTime;
			} else {
				pendingSeekRef.current = state.time;
				setPlayerKey(k => k + 1);
			}
		} else {
			ref.current.currentTime = seekTime;
		}
	});

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		if (paused || !id) return;
		const intervalId = setInterval(() => {
			if (!ref.current) return;
			const elapsed = (Date.now() - serverTimestampRef.current) / 1000;
			const expectedTime = serverTimeRef.current + elapsed;
			if (!looped && expectedTime >= ref.current.duration) return;
			const expectedVideoTime = getSeekTime(expectedTime, looped, ref.current.duration);
			const drift = Math.abs(ref.current.currentTime - expectedVideoTime);
			if (drift > 2) ref.current.currentTime = expectedVideoTime;
		}, 5000);
		return () => clearInterval(intervalId);
	}, [paused, id, looped]);

	if (!isMounted) {
		return null;
	}

	const getSrc = () => {
		if (type === "telegram") return `/api/telegram/stream?v=${playerKey}`;
		if (type === "youtube") return `https://www.youtube.com/watch?v=${id}`;
		return undefined;
	};

	return createPortal(
		<section className="absolute top-0 left-0 h-screen w-screen bg-black z-50">
			<ReactPlayer
				key={playerKey}
				ref={ref}
				src={getSrc()}
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
