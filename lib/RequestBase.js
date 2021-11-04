const axios = require('axios');

module.exports = class {
    client;
    constructor(){
        this.client = axios.create({
            baseURL: process.env.API_URL,
            timeout: 5000,
          });
    }

    async get(endpoint, options = {}) {
        const response = await this.client.get(endpoint,options);
        return response.data;
    }
}