import dotenv from 'dotenv';
dotenv.config({ path: "./.env" });
import express from 'express';
import cors from 'cors';
import axios from 'axios';


const app = express();
const PORT = 3001;

// Enable CORS for frontend requests
app.use(cors());

// API route to fetch top gainers and losers
app.get("/api/top-stocks", async (req, res) => {
    try {
        const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

        if (!apiKey) {
            throw new Error("Missing API key. Make sure ALPHA_VANTAGE_API_KEY is set in your .env file.");
        }

        const response = await axios.get("https://www.alphavantage.co/query", {
            params: {
                function: "TOP_GAINERS_LOSERS",
                apikey: apiKey,
            },
        });

        console.log("API Response:", response.data);

        if (!response.data.top_gainers) {
            throw new Error("Unexpected API response structure");
        }

        res.json(response.data.top_gainers); // Send top gainers to frontend
    } catch (error) {
        console.error("Error fetching stocks:", error.message);
        res.status(500).json({ error: "Failed to fetch stock data" });
    }
});


// Start Express server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));