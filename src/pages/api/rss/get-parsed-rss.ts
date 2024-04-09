import type { APIRoute } from "astro";

import { getFeed } from "@/global/services/rssService"

export const GET: APIRoute = async ({ url }) => {
    const urlToParsed = url.searchParams.get("url");

    if (urlToParsed == null) {
        return new Response("Please send the url to parsed", {
            status: 400,
        });
    }

    const feed = await getFeed({url: urlToParsed});
    if (!feed) {
        return new Response("Error to parsed feed", {
            status: 400,
        });
    }

    return new Response(JSON.stringify(feed), {
        headers: {
            "content-type": "application/json",
        },
    })
}