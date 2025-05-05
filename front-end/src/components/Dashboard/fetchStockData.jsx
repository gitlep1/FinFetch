import axios from "axios";

const API_KEY_AV = import.meta.env.VITE_API_KEY_AV;
const BASE_URL_AV = import.meta.env.VITE_BASE_URL_AV;

const API_KEY_FINNHUB = import.meta.env.VITE_API_KEY_FINNHUB;
const BASE_URL_FINNHUB = import.meta.env.VITE_BASE_URL_FINNHUB;

const fetchFromFinnhub = async (symbol) => {
  try {
    const profileRes = await axios.get(`${BASE_URL_FINNHUB}/stock/profile2`, {
      params: {
        symbol,
        token: API_KEY_FINNHUB,
      },
    });

    const quoteRes = await axios.get(`${BASE_URL_FINNHUB}/quote`, {
      params: {
        symbol,
        token: API_KEY_FINNHUB,
      },
    });

    return {
      name: profileRes.data.name || symbol,
      price: quoteRes.data.c,
      changePercent:
        ((quoteRes.data.c - quoteRes.data.pc) / quoteRes.data.pc) * 100,
      source: "Finnhub",
    };
  } catch (error) {
    return `Finnhub error: ${error.message}`;
  }
};

export const fetchStockData = async (symbol) => {
  try {
    const searchResponse = await axios.get(BASE_URL_AV, {
      params: {
        function: "SYMBOL_SEARCH",
        keywords: symbol,
        apikey: API_KEY_AV,
      },
    });

    if (searchResponse.data.Information) {
      return await fetchFromFinnhub(symbol);
    }

    const bestMatch = searchResponse.data.bestMatches?.[0];
    const fullName = bestMatch ? bestMatch["2. name"] : symbol;

    const quoteResponse = await axios.get(BASE_URL_AV, {
      params: {
        function: "GLOBAL_QUOTE",
        symbol,
        apikey: API_KEY_AV,
      },
    });

    if (quoteResponse.data.Note) {
      return await fetchFromFinnhub(symbol);
    }

    const stockData = quoteResponse.data["Global Quote"];

    return {
      name: fullName,
      price: parseFloat(stockData["05. price"]),
      changePercent: parseFloat(
        stockData["10. change percent"].replace("%", "")
      ),
      source: "AlphaVantage",
    };
  } catch (error) {
    return error.message;
  }
};
