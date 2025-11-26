import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { lirik } from './lirik.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// API route
app.get('/api/lirik', async (req, res) => {
    const { q } = req.query;
    if (!q) return res.json({ status:false, message:"Please provide ?q=song_name" });

    const result = await lirik(q);
    res.json(result);
});

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
