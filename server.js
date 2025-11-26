import express from 'express';
import cors from 'cors';
import { lirik } from './lirik.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/lirik', async (req, res) => {
    const { q } = req.query;

    if (!q) {
        return res.json({
            status: false,
            message: "Please provide ?q=song_name"
        });
    }

    const result = await lirik(q);
    res.json(result);
});

app.listen(PORT, () => {
    console.log(`API Running on PORT ${PORT}`);
});
