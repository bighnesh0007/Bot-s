const { Client, Intents } = require('discord.js');
const request = require('request');
const { MongoClient } = require('mongodb');

/* */

const client = new Client({
    intents: [
        1 << 0,  // GUILDS
        1 << 9,  // GUILD_MESSAGES
        1 << 15  // MESSAGE_CONTENTS
    ]
});
const API_KEY = "d2cbae8a153b83cb8a2b8e0481ebaadb";
const token = "MTIzNTI4ODQ0ODU5Njk3MTU5Mg.Gu0IFB.lrVYln63z8UAmpTgTSzj4yXXIYUC6WDm_DKxIM";

const MONGODB_URI = "mongodb://localhost:27017/weather"; 
let db;

MongoClient.connect(MONGODB_URI, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to MongoDB');
        db = client.db('discord_bot');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

// Array of random YouTube video links
const youtubeVideos = [
    'https://youtu.be/tXgOZglkShw?si=DGloZ-6I0IDRLDhj',
    'https://youtu.be/ZQnwTWXg85Y?si=r91kG1pmnQ0At3pK',
    'https://youtu.be/tg0GTSyDXak?si=91Fuvoykyp2KDrnV',
    'https://youtu.be/9ozZwqUMaLg?si=5XaW0Bzp7RUgazmn',
   
];

// Function to get a random YouTube video link from the array
function getRandomYoutubeVideo() {
    const randomIndex = Math.floor(Math.random() * youtubeVideos.length);
    return youtubeVideos[randomIndex];
}


// Function to generate a random joke
function generateJoke() {
    const jokes = [
        "Why don't scientists trust atoms? Because they make up everything!",
        "Parallel lines have so much in common. It's a shame they'll never meet.",
        "I told my wife she was drawing her eyebrows too high. She looked surprised.",
        "Why did the scarecrow win an award? Because he was outstanding in his field!",
        "I'm reading a book on the history of glue. I just can't seem to put it down!",
        "What did the janitor say when he jumped out of the closet? Supplies!",
        "I told my computer I needed a break, and now it won't stop sending me vacation ads.",
        "Why did the bicycle fall over? Because it was two-tired!",
        "I used to play piano by ear, but now I use my hands.",
        "I'm reading a book about anti-gravity. It's impossible to put down!",
        "Why did the tomato turn red? Because it saw the salad dressing!",
        "Why don't skeletons fight each other? They don't have the guts!",
        "I used to be a baker, but I couldn't make enough dough.",
        "What do you call fake spaghetti? An impasta!",
        "I'm on a whiskey diet. I've lost three days already.",
        "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
        "Why did the tomato turn red? Because it saw the salad dressing!",
        "I'm reading a book on the history of glue. I just can't seem to put it down!",
        "Why don't some couples go to the gym? Because some relationships don't work out!",
        "What do you get when you cross a snowman and a vampire? Frostbite!",
        "I told my computer I needed a break, and now it won't stop sending me vacation ads.",
        "What did the janitor say when he jumped out of the closet? Supplies!",
        "Why was the math book sad? Because it had too many problems.",
        "Why don't some couples go to the gym? Because some relationships don't work out!",
        "What do you get when you cross a snowman and a vampire? Frostbite!",
        "I told my computer I needed a break, and now it won't stop sending me vacation ads.",
        "What did the janitor say when he jumped out of the closet? Supplies!",
        "Why was the math book sad? Because it had too many problems.",
        "Why don't some couples go to the gym? Because some relationships don't work out!",
        "What do you get when you cross a snowman and a vampire? Frostbite!",
        "I told my computer I needed a break, and now it won't stop sending me vacation ads.",
        "What did the janitor say when he jumped out of the closet? Supplies!",
        "Why was the math book sad? Because it had too many problems.",
        "I used to be a baker, but I couldn't make enough dough.",
        "What do you call fake spaghetti? An impasta!",
        "I'm on a whiskey diet. I've lost three days already.",
        "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
        "Why did the tomato turn red? Because it saw the salad dressing!",
        "I'm reading a book on the history of glue. I just can't seem to put it down!",
        "Why don't some couples go to the gym? Because some relationships don't work out!",
        "What do you get when you cross a snowman and a vampire? Frostbite!",
        "I told my computer I needed a break, and now it won't stop sending me vacation ads.",
        "What did the janitor say when he jumped out of the closet? Supplies!",
        "Why was the math book sad? Because it had too many problems.",
        "I used to be a baker, but I couldn't make enough dough.",
        "What do you call fake spaghetti? An impasta!",
        "I'm on a whiskey diet. I've lost three days already!",
        "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
        "Why did the tomato turn red? Because it saw the salad dressing!",
        "I'm reading a book on the history of glue. I just can't seem to put it down!",
        "Why don't some couples go to the gym? Because some relationships don't work out!",
        "What do you get when you cross a snowman and a vampire? Frostbite!",
        "I told my computer I needed a break, and now it won't stop sending me vacation ads.",
        "What did the janitor say when he jumped out of the closet? Supplies!",
        "Why was the math book sad? Because it had too many problems.",
        "I used to be a baker, but I couldn't make enough dough.",
        "What do you call fake spaghetti? An impasta!",
        "I'm on a whiskey diet. I've lost three days already!",
        "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
        "Why did the tomato turn red? Because it saw the salad dressing!",
        "I'm reading a book on the history of glue. I just can't seem to put it down!",
        "Why don't some couples go to the gym? Because some relationships don't work out!",
        "What do you get when you cross a snowman and a vampire? Frostbite!",
        "I told my computer I needed a break, and now it won't stop sending me vacation ads.",
        "What did the janitor say when he jumped out of the closet? Supplies!",
        "Why was the math book sad? Because it had too many problems.",
        "I used to be a baker, but I couldn't make enough dough.",
        "What do you call fake spaghetti? An impasta!",
        "I'm on a whiskey diet. I've lost three days already!",
        "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
        "Why did the tomato turn red? Because it saw the salad dressing!",
        "I'm reading a book on the history of glue. I just can't seem to put it down!",
        "Why don't some couples go to the gym? Because some relationships don't work out!",
        "What do you get when you cross a snowman and a vampire? Frostbite!",
        "I told my computer I needed a break, and now it won't stop sending me vacation ads.",
        "What did the janitor say when he jumped out of the closet? Supplies!",
        "Why was the math book sad? Because it had too many problems.",
        "I used to be a baker, but I couldn't make enough dough.",
        "What do you call fake spaghetti? An impasta!",
        "I'm on a whiskey diet. I've lost three days already!",
        "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
        "Why did the tomato turn red? Because it saw the salad dressing!",
        "I'm reading a book on the history of glue. I just can't seem to put it down!",
        "Why don't some couples go to the gym? Because some relationships don't work out!",
        "What do you get when you cross a snowman and a vampire? Frostbite!",
        "I told my computer I needed a break, and now it won't stop sending me vacation ads.",
        "What did the janitor say when he jumped out of the closet? Supplies!",
        "Why was the math book sad? Because it had too many problems.",
        "I used to be a baker, but I couldn't make enough dough.",
        "What do you call fake spaghetti? An impasta!",
        "I'm on a whiskey diet. I've lost three days already!",
        "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
        "Why did the tomato turn red? Because it saw the salad dressing!",
        "I'm reading a book on the history of glue. I just can't seem to put it down!",
        "Why don't some couples go to the gym? Because some relationships don't work out!",
        "What do you get when you cross a snowman and a vampire? Frostbite!",
        "I told my computer I needed a break, and now it won't stop sending me vacation ads.",
        "What did the janitor say when he jumped out of the closet? Supplies!",
        "Why was the math book sad? Because it had too many problems.",
        "I used to be a baker, but I couldn't make enough dough.",
        "What do you call fake spaghetti? An impasta!",
        "I'm on a whiskey diet. I've lost three days already!",
        "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
        "Why did the tomato turn red? Because it saw the salad dressing!",
        "I'm reading a book on the history of glue. I just can't seem to put it down!",
        "Why don't some couples go to the gym? Because some relationships don't work out!",
        "What do you get when you cross a snowman and a vampire? Frostbite!",
        "I told my computer I needed a break, and now it won't stop sending me vacation ads.",
        "What did the janitor say when he jumped out of the closet? Supplies!",
        "Why was the math book sad? Because it had too many problems.",
        "I used to be a baker, but I couldn't make enough dough.",
        "What do you call fake spaghetti? An impasta!",
        "I'm on a whiskey diet. I've lost three days already!",
        "Why did the golfer bring two pairs of pants? In case he got a hole in one!"
    ];
    
    const randomIndex = Math.floor(Math.random() * jokes.length);
    return jokes[randomIndex];
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    
});

client.on('messageCreate', async message => {
    console.log('Message received:', message.content);
    
    if (message.content === '!ping') {
        message.reply('Pong!');
    }
    
    if (message.content.startsWith('!weather')) {
        const city = message.content.split(' ')[1]; 
        if (!city) {
            return message.reply("Please provide a city name after the command. Usage: `!weather <city>`");
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        request(url, { json: true }, (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return message.reply(`Failed to get weather data: ${error ? error : body.message}`);
            }

            const weather = body.weather[0].description;
            const temperature = body.main.temp;
            const reply = `The weather in ${city} is currently ${weather} with a temperature of ${temperature}°C.`;
            message.reply(reply);

            // Store weather data in MongoDB
            const weatherData = {
                city: city,
                weather: weather,
                temperature: temperature,
                timestamp: new Date()
            };
            db.collection('weather_data').insertOne(weatherData)
                .then(result => {
                    console.log('Weather data stored in MongoDB');
                })
                .catch(err => {
                    console.error('Error storing weather data in MongoDB:', err);
                });
        });
    }

    if (message.content === '!meme') {
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
                if (memeData && memeData.length > 0) {
                    const randomIndex = Math.floor(Math.random() * memeData.length);
                     const randomMeme = memeData[randomIndex];
                     message.reply(randomMeme.image);
                } else {
                    console.log("Failed to fetch memes.");
                }
            });
        }).catch(error => {
            console.error('Error importing node-fetch:', error);
        });
        
        
        
    }

    if (message.content === '!joke') {
        const joke = generateJoke();
        message.reply(`Here's a joke for you: ${joke}`);
    }

    if (message.content === '!hi') {
        message.reply(`Hello are you new this server!\n https://www.youtube.com/@LifeofSrikar \n Hey there! If you're enjoying what you're seeing, don't forget to give this video a thumbs up, share it with your friends, and hit that subscribe button below. By subscribing, you'll be joining our awesome community and staying up-to-date with all our latest content. Thanks for watching and for your support!`);
    }
    
    if (message.content === '!insta') {
        message.reply(`Check out my Instagram profile: https://www.instagram.com/life_of_srikar?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==\nFollow me for more updates and behind-the-scenes content!`);
    }
    
    
    if (message.content === '!yt') {
        message.reply(`Check out my YouTube channel for more content: https://www.youtube.com/@LifeofSrikar .\nDon't forget to subscribe and hit the notification bell to stay updated with the latest videos!`);
    }
    if (message.content === '!about') {
        message.reply(`
            🌟 **Hello friend!** 🌟
    
            👨‍🍳 **I’m Srikar,**
            Welcome to 'Life of Srikar’ – Your Ultimate Food Destination! 🍽️
    
            Indulge in a gastronomic adventure with me as I explore the world of flavors, one bite at a time. 🌍 On this channel, we're all about food reviews, culinary explorations, and uncovering hidden gems in the world of cuisine.
    
            🔔 **Don't forget to subscribe** and hit the notification bell to stay updated on the latest foodie escapades!
    
            📧 For business inquiries, collaborations, or to promote your food-related products or establishments on 'Life of Srikar,' please contact us at [scarlpu12@gmail.com]. Let's create delicious content together!
    
            **Connect with me on:**
            📸 [Instagram](https://instagram.com/life_of_srikar?igshid=MzMyNGUyNmU2YQ==)
    
            🌐 **Channel Details:**
            [YouTube Channel](https://www.youtube.com/@LifeofSrikar)
            📧 **View email address**
            📱 **Phone verified**
            📹 **1.03K subscribers**
            🎥 **77 videos**
            👀 **292,061 views**
            📅 **Joined 22 Aug 2023**
            🌍 **Location: India**
        `);
    }
    if(message.content==='!video'){
        const randomVideo = getRandomYoutubeVideo();
        message.reply(`${randomVideo}`)
    }
    

});

client.login(token);
