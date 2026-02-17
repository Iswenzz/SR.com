import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const url = "http://localhost:9000/api/telegram/stream";
    const response = await fetch(url, { 
        headers: req.headers,
        method: req.method 
    });

    return new NextResponse(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
    });
};