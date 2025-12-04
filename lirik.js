const axios = require('axios');

/**
 * Lyrics fetch function for LRCLib
 * @param {string} title - Song title
 * @returns {Promise<Object>} - Lyrics result object for frontend
 */
async function lirik(title) {
    try {
        if (!title) {
            return {
                status: false,
                message: "Title is required!",
                data: {
                    artis: 'Unknown',
                    image: 'https://telegra.ph/file/e7a4414620ce6da03bb02.jpg',
                    title: 'Not Found',
                    rilis: '-',
                    lirik: 'Lyrics Not Found!'
                }
            };
        }

        const query = encodeURIComponent(title);

        const { data } = await axios.get(
            `https://lrclib.net/api/search?q=${query}`,
            {
                headers: {
                    referer: `https://lrclib.net/search/${query}`,
                    "user-agent":
                        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36"
                }
            }
        );

        // Pick first result if exists
        const first = (data?.data && data.data.length > 0) ? data.data[0] : null;

        const result = first
            ? {
                  artis: first?.artist || 'Unknown',
                  image: first?.cover || 'https://telegra.ph/file/e7a4414620ce6da03bb02.jpg',
                  title: first?.title || 'Not Found',
                  rilis: first?.release_date || '-',
                  lirik: first?.lyric || 'Lyrics Not Found!'
              }
            : {
                  artis: 'Unknown',
                  image: 'https://telegra.ph/file/e7a4414620ce6da03bb02.jpg',
                  title: 'Not Found',
                  rilis: '-',
                  lirik: 'Lyrics Not Found!'
              };

        return {
            status: true,
            creator: 'Chamod Nimsara',
            data: result
        };

    } catch (error) {
        return {
            status: false,
            message: error.message,
            data: {
                artis: 'Unknown',
                image: 'https://telegra.ph/file/e7a4414620ce6da03bb02.jpg',
                title: 'Not Found',
                rilis: '-',
                lirik: 'Lyrics Not Found!'
            }
        };
    }
}

module.exports = { lirik };
