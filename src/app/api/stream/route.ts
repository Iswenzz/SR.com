import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    const url = "http://localhost:9000/api/telegram/stream?";
    return fetch(url, { headers: req.headers });
};