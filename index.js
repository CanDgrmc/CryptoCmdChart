require('dotenv').config()
const args = require('args');

const Drawer = require('./lib/Drawer');
const CoinMarketClient = require('./lib/CoinMarketClient');
const stringTool = require('./tools/string');
let LIMIT = 5
let coinId = "shiba-inu";
const setLimit = (content) => {
    LIMIT = content
}
const setCoinId = (content) => {
    coinId = content
}

async function run() {
    console.log('running');
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
    
    const drawerPrices = new Drawer(mappedPrices);
    const drawerMarketCaps = new Drawer(mappedMarketCaps);

    console.log('                                                                                 ############# PRICE ##############                                                                                 ')
    console.log(drawerPrices.init());
    console.log('\n \n')
    console.log('                                                                             ############# MARKET CAP ##############                                                                                 ')
    console.log(drawerMarketCaps.init());
    console.log('\n \n')

    console.log(`                                                                                 FROM: ${firstDate} || TO: ${lastDate}`);
}

// run().then(() => {
//     console.log('done!..');
// })

args.options([
    {
        name: 'id',
        description: 'Coin id. Default: shiba-inu',
        init: setCoinId,
        defaultValue: "shiba-inu"
    },
    {
        name: 'limit',
        description: 'Number of days. Default: 5',
        init: setLimit,
        defaultValue: 5
    }
]).command('run', 'Draw a command line chart', run, ['r'])

const flags = args.parse(process.argv)