"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";

let socket: Nullable<ReturnType<typeof io>> = null;
let socketRoom: Nullable<string> = null;

const getSocket = (room: string) => {
	if (socket && socketRoom !== room) {
		socket.disconnect();
		socket = null;
	}
	if (!socket) {
		socketRoom = room;
		socket = io(process.env.NEXT_PUBLIC_MEDIASYNC_WS_URL, {
			transports: ["websocket", "polling"],
			query: { room }
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

const useSocket = <T,>(room: string, event: string, callback: SocketCallback<T>) => {
	useEffect(() => {
		const socket = getSocket(room);
		socket.on(event, callback);
		return () => {
			socket.off(event, callback);
		};
	}, [room, event, callback]);
};

type SocketCallback<T> = (state: T) => void;

export default useSocket;
