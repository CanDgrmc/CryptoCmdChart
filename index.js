require('dotenv').config()
const Drawer = require('./lib/Drawer');
const CoinMarketClient = require('./lib/CoinMarketClient');
const stringTool = require('./tools/string');
const DAY = 24 * 60 * 60 * 1000;
const LIMIT = 5
const coinId = "shiba-inu";

async function run() {
    const coinMarketClient = new CoinMarketClient();
    const data = await coinMarketClient.getMarketChart(coinId, LIMIT);
    const first = data.prices[0][0];
    const last = data.prices[data.prices.length - 1][0];
    const firstDate = new Date(first).toISOString();
    const lastDate = new Date(last).toISOString();
    

    const mappedPrices = data.prices.map( i => {
        return i[1]
    });
    const mappedMarketCaps = data.market_caps.map( i => {
        return i[1]
    });
    const mappedTotalVolumes = data.total_volumes.map( i => {
        return i[1]
    });
    const drawerPrices = new Drawer(mappedPrices);
    const drawerMarketCaps = new Drawer(mappedMarketCaps);
    const drawerTotalVolumes = new Drawer(mappedTotalVolumes);

    console.log('                                                                                 ############# PRICE ##############                                                                                 ')
    console.log(drawerPrices.init());
    console.log('\n \n')
    console.log('                                                                             ############# MARKET CAP ##############                                                                                 ')
    console.log(drawerMarketCaps.init());
    console.log('\n \n')

    console.log(`                                                                                 FROM: ${firstDate} || TO: ${lastDate}`);
}

run().then(() => {
    console.log('done!..');
})