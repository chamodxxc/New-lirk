import axios from "axios";
import * as cheerio from "cheerio";

async function lirik(query) {
    try {
        // Genius Search API
        const search = await axios.get(
            `https://api.genius.com/search?q=${query}&access_token=QM9gJBlJNIkeljJO2ZE_--FOHQh_D63QxxoOGjS5UQVyugkVxSVl8e8yYwUJadRy`
        );

        const hits = search.data.response.hits;

        if (!hits.length) {
            return {
                status: false,
                message: "Song not found"
            };
        }

        const song = hits[0].result;

        // RapidAPI Lyrics
        const lyricsAPI = await axios.get(
            `https://genius-song-lyrics5.p.rapidapi.com/lyrics`,
            {
                params: { songId: song.id },
                headers: {
                    "x-rapidapi-host": "genius-song-lyrics5.p.rapidapi.com",
                    "x-rapidapi-key":
                        "7a097ad159mshd36d6dc8871d0a4p19abcajsn76810d8dd6b1"
                }
            }
        );

        const html = lyricsAPI.data.lyrics?.lyrics?.body?.html ?? "";
        const $ = cheerio.load(html);
        const lyrics = $("p").text().trim();

        return {
            status: true,
            creator: "Chamod Nimsara",
            data: {
                artist: song.artist_names,
                title: song.full_title,
                release: song.release_date_for_display,
                image: song.header_image_url,
                lyrics: lyrics
            }
        };
    } catch (e) {
        console.log(e);
        return { status: false, error: e.message };
    }
}

export { lirik };
