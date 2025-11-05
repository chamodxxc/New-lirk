import express from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';

const app = express();
const PORT = process.env.PORT || 3000;

async function lirik(query) {
    try {
        let res = await axios.get(`http://api.genius.com/search?q=${query}&access_token=QM9gJBlJNIkeljJO2ZE_--FOHQh_D63QxxoOGjS5UQVyugkVxSVl8e8yYwUJadRy`);
        let hits = res.data.response.hits;

        if (hits.length > 0) {
            let d = hits[0].result;
            let options = {
               method: 'GET',
               url: 'https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/',
               params: { id: d.id },
               headers: {
                   'x-rapidapi-key': '6d76823bdbmsh03d32d092d169b8p165006jsn3fdc9f9b758f',
                   'x-rapidapi-host': 'genius-song-lyrics1.p.rapidapi.com'
               }
          };
          let rapid = await axios(options);
          let $ = cheerio.load(rapid.data.lyrics.lyrics.body.html);
          let lyric = $('p').text().trim();

          return {
              status: true,
              creator: 'Chamod Nimsara',
              data: {
                  artist: d.artist_names,
                  image: d.header_image_thumbnail_url,
                  title: d.full_title,
                  release_date: d.release_date_for_display,
                  lyrics: lyric
              }
          };
        } else {
            return {
                status: false,
                creator: 'Chamod Nimsara',
                data: {
                    artist: 'No Name',
                    image: 'https://telegra.ph/file/e7a4414620ce6da03bb02.jpg',
                    title: 'Not Found',
                    release_date: 'N/A',
                    lyrics: 'Lyrics not found!'
                }
            };
        }
    } catch (error) {
        return {
            status: false,
            creator: 'Chamod Nimsara',
            error: error.message
        };
    }
}

// =====================
// 📡 API ROUTE
// =====================
app.get('/lirik', async (req, res) => {
    const query = req.query.query;
    if (!query) return res.json({ status: false, message: "Missing ?query=" });
    const result = await lirik(query);
    res.json(result);
});

// =====================
// 🌐 SERVER START
// =====================
app.listen(PORT, () => console.log(`🎵 Lirik API running on http://localhost:${PORT}`));
