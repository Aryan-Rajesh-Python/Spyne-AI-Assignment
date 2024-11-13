const axios = require('axios');
const constants = require('./util.constant')
const username = 'elastic';
const password = '4TMIU2DzkZZ87UwA2qW28Uak';
const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');


function ingest_elasticsearch(data) {

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${constants.elastic_base_url}/spyne-user-data/_doc`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${token}`
        },
        data: data
    };
    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });

}

module.exports = { ingest_elasticsearch }