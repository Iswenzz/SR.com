import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
	const room = req.nextUrl.searchParams.get("room") ?? "";
	const response = await fetch(
		`${process.env.MEDIASYNC_URL}/api/telegram/stream?room=${encodeURIComponent(room)}`,
		{
			headers: req.headers,
			method: req.method
		}
	);
	return new NextResponse(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers: response.headers
	});
};
