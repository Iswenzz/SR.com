import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
	const response = await fetch(`${process.env.MEDIASYNC_URL}/api/telegram/stream`, {
		headers: req.headers,
		method: req.method
	});
	return new NextResponse(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers: response.headers
	});
};
