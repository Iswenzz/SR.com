"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";

let socket: Nullable<ReturnType<typeof io>> = null;

const getSocket = () => {
	if (!socket) {
		socket = io(process.env.NEXT_PUBLIC_WS_URL, {
			transports: ["websocket", "polling"]
		});
		socket.on("connect", () => {
			console.log("Socket connected");
		});
		socket.on("disconnect", () => {
			console.log("Socket disconnected");
		});
	}
	return socket;
};

const useSocket = <T,>(event: string, callback: SocketCallback<T>) => {
	useEffect(() => {
		const socket = getSocket();
		socket.on(event, callback);
		return () => {
			socket.off(event, callback);
		};
	}, [event, callback]);
};

type SocketCallback<T> = (state: T) => void;

export default useSocket;
