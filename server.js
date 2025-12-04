import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { lirik } from './lirik.js'; // Your lirik function

// Path helpers
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(__dirname));

// API route for lyrics
app.get('/api/lirik', async (req, res) => {
    const { q } = req.query;

    if (!q) {
        return res.status(400).json({
            status: false,
            message: "Please provide ?q=song_name"
        });
    }

    try {
        const result = await lirik(q);
        return res.json(result);
    } catch (err) {
        console.error("Lyrics fetch error:", err);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
});

// Serve index.html for /
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Catch-all route (optional for frontend routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
