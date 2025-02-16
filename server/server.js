require('dotenv').config();
import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = 3001;

// Enable CORS for frontend requests
app.use(cors());

// API Route to fetch top stocks
app.get('/api/top-stocks', async (req, res) => {
    try {
        const response = await get('https://www.alphavantage.co/query', {
            params: {
                function: 'TOP_GAINERS_LOSERS',
                apikey: process.env.ALPHA_VANTAGE_API_KEY
            }
        });
        res.json(response.data.top_gainers.slice(0, 10)); // Send top 10 stocks
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch stock data' });
    }
});

// Start Express server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));