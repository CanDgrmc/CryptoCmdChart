const RequestBase = require('./RequestBase');
const config = require('../config');

class CoinMarketClient extends RequestBase {
    
    async latestPrice(symbol, convert) {
        const response = await this.get("/v1/cryptocurrency/quotes/latest",{
            params: {symbol, convert}
        })
        console.log('response',response)
        return response[symbol];
    }

    async getPrice(coinId) {
        const response = await this.get(`/coins/${coinId}`,{
            params:{
                tickers: config.tickers,
                community_data: config.community_data,
                developer_data: config.developer_data,
            }
        })
        return response;
    }

    async getPriceByDay(coinId, date) {
        const response = await this.get(`/coins/${coinId}`,{
            params: { 
                date, 
                tickers: config.tickers,
                community_data: config.community_data,
                developer_data: config.developer_data, 
            }
        })
        return response.market_data;
    }

    async getMarketChart(coinId, days) {
        const response = await this.get(`/coins/${coinId}/market_chart`,{
            params: { 
                vs_currency: "TRY",
                days,
                tickers: config.tickers,
                community_data: config.community_data,
                developer_data: config.developer_data, 
            }
        })
        return response;
    }

    
}

module.exports = CoinMarketClient;