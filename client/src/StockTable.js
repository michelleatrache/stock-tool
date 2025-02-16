import React, { useEffect, useState } from "react";
import axios from "axios";

const StockTable = () => {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3001/api/top-stocks")
            .then(response => {
                setStocks(response.data); // Store API data in state
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching stock data:", error);
                setError("Failed to load stock data");
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <table border="1" cellPadding="10" cellSpacing="0">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Symbol</th>
                    <th>Company</th>
                    <th>Price</th>
                    <th>Change (%)</th>
                </tr>
            </thead>
            <tbody>
                {stocks.map((stock, index) => (
                    <tr key={stock.symbol}>
                        <td>{index + 1}</td>
                        <td>{stock.symbol}</td>
                        <td>{stock.name}</td>
                        <td>${stock.price}</td>
                        <td style={{ color: stock.change_percent > 0 ? "green" : "red" }}>
                            {stock.change_percent}%
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default StockTable;