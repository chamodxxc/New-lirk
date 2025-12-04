const axios = require('axios');

/**
 * Lyrics fetch function
 * @param {string} title - Song title
 * @returns {Promise<Object>} - Lyrics result object
 */
async function lyrics(title) {
    try {
        if (!title) {
            return {
                status: false,
                message: "Title is required!"
            };
        }

        // Encode title for query
        const query = encodeURIComponent(title);

        // Fetch from LRCLib
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

        // Return in standard format
        return {
            status: true,
            creator: "Chamod Nimsara",
            result: data
        };

    } catch (error) {
        return {
            status: false,
            message: error.message
        };
    }
}

// Export CommonJS style for existing server.js / frontend
module.exports = { lyrics };
