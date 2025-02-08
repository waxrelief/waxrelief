import { VideoSource, createEntry, createEpisode, createEpisodeDetails, fetch, Document } from "soshiki-sources";

export default class HentaiHavenSource extends VideoSource {
    async getListing(previousInfo, listing) {
        const url = "https://hentaihaven.xxx/";
        const response = await fetch(url);
        const html = await response.text();
        const doc = new Document(html);

        const entries = doc.querySelectorAll(".video-block a").map(element => {
            const title = element.querySelector(".video-title")?.textContent || "Unknown";
            const id = element.getAttribute("href")?.split("/").pop() || "";
            const imageUrl = element.querySelector("img")?.getAttribute("data-src") || "";

            return createEntry({
                id,
                title,
                image: imageUrl,
                type: "video"
            });
        });

        doc.free();
        return { entries, hasMore: false };
    }

    async getEntry(id) {
        const url = `https://hentaihaven.xxx/video/${id}/`;
        const response = await fetch(url);
        const html = await response.text();
        const doc = new Document(html);

        const title = doc.querySelector(".video-title")?.textContent || "Unknown";
        const coverImage = doc.querySelector(".video-cover img")?.getAttribute("src") || "";

        doc.free();
        return createEntry({
            id,
            title,
            image: coverImage,
            type: "video"
        });
    }
}
