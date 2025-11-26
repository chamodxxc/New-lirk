import axios from 'axios';
import * as cheerio from 'cheerio';

async function lirik(query) {
    try {
        let split = query.split(' ');
        if (split.length > 1) split = split.join('+');
        
        let res = await axios.get(`http://api.genius.com/search?q=${query}&access_token=QM9gJBlJNIkeljJO2ZE_--FOHQh_D63QxxoOGjS5UQVyugkVxSVl8e8yYwUJadRy`)
        
        let hits = res.data.response.hits;

        if (hits.length > 0) {
            let d = hits[0].result;

            let options = {
               method: 'GET',
               url: 'https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/',
               params: {id: d.id},
               headers: {
                   'x-rapidapi-key': '6d76823bdbmsh03d32d092d169b8p165006jsn3fdc9f9b758f',
                   'x-rapidapi-host': 'genius-song-lyrics1.p.rapidapi.com'
               }
            };

            let rapid = await axios(options);
            let $ = await cheerio.load(rapid.data.lyrics.lyrics.body.html);

            let lirik = $('p').text().trim();

            return {
                status: true,
                creator: 'Chamod Nimsara',
                data: {
                    artis: d.artist_names,
                    image: d.header_image_thumbnail_url,
                    title: d.full_title,
                    rilis: d.release_date_for_display,
                    lirik: lirik
                }
            };
        } else {
            return {
                status: false,
                creator: 'Chamod Nimsara',
                data: {
                    artis: 'Unknown',
                    image: 'https://telegra.ph/file/e7a4414620ce6da03bb02.jpg',
                    title: 'Not Found',
                    rilis: '-',
                    lirik: 'Tidak Ditemukan!'
                }
            };
        }
    } catch (err) {
        return { error: true, message: err.message };
    }
}

export { lirik };
