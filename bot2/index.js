import('node-fetch').then(({ default: fetch }) => {
    const fetchMemes = async () => {
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
    };

    fetchMemes().then(memeData => {
        if (memeData) {
            memeData.forEach(meme => {
                // console.log(meme.image);
                // Do something with each meme image URL
            });
        } else {
            console.log("Failed to fetch memes.");
        }
    });
}).catch(error => {
    console.error('Error importing node-fetch:', error);
});
