const fetch = require('node-fetch');

async function fetchMemes() {
    const url = 'https://programming-memes-images.p.rapidapi.com/v1/memes';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '6ba42d6be9mshf3648d59bec4d5dp17cc72jsn03fb59f1b94d',
            'X-RapidAPI-Host': 'programming-memes-images.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const memeData = await response.json();
        return memeData;
    } catch (error) {
        console.error('Error fetching memes:', error);
        return null;
    }
}

module.exports = fetchMemes;
