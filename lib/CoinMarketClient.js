const RequestBase = require('./RequestBase');
const config = require('../config');

class CoinMarketClient extends RequestBase {
    
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

    async getMarketChart(coinId, days, CURRENCY) {
        const response = await this.get(`/coins/${coinId}/market_chart`,{
            params: { 
                vs_currency: CURRENCY,
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