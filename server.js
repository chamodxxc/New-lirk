import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { lirik } from './lirik.js'; // Your lirik function

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// API route for lyrics
app.get('/api/lirik', async (req, res) => {
    const { q } = req.query;
    if (!q) {
        return res.json({ status:false, message: "Please provide ?q=song_name" });
    }

    try {
        const result = await lirik(q);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status:false, message:"Internal Server Error" });
    }
});

// Serve index.html for /
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Catch all other routes (optional)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
