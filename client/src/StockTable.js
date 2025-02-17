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
    console.log("Stocks data:", stocks);
    return (
        <table border="1" cellPadding="10" cellSpacing="0">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Symbol</th>
                    <th>Price</th>
                    <th>Change (%)</th>
                    <th>Change Amount</th>
                    <th>Volume</th>
                </tr>
            </thead>
            <tbody>
                {stocks.map((stock, index) => (
                    <tr key={stock.symbol}>
                        <td>{index + 1}</td>
                        <td>{stock.ticker}</td>
                        <td>${stock.price}</td>
                        <td style={{ color: "green" }}>
                            {stock.change_percentage}
                        </td>
                        <td style={{ color: "green" }}>
                            {stock.change_amount}
                        </td>
                        <td>{stock.volume}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default StockTable;