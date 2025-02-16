import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/top-stocks")
            .then(response => setStocks(response.data))
            .catch(error => console.error("Error:", error));
    }, []);

    return (
        <div>
            <h1>Top 10 Stocks</h1>
            <ul>
                {stocks.map((stock, index) => (
                    <li key={index}>{stock.ticker} - {stock.price}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;