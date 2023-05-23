//API Key: 8J8CDapquPRnEoWBXnoGiUg4z
//API Key Secret: nZuWLxEIi4agGgl0mI9n21ymJyeRWH1qWQFatrAsoo1ZBFR5zS

import { Client, auth } from "./node_modules/twitter-api-sdk/dist/index";

// Import the Twitter API library.
const twitter = require("twitter");

// Initialize auth client first
const authClient = new auth.OAuth2User({
  //client_id: process.env.CLIENT_ID,
  //client_secret: process.env.CLIENT_SECRET,
  client_id: "27161040",
  client_secret: "nZuWLxEIi4agGgl0mI9n21ymJyeRWH1qWQFatrAsoo1ZBFR5zS",
  callback: "YOUR-CALLBACK",
  scopes: ["tweet.read", "users.read", "offline.access"],
});

// Pass auth credentials to the library client
const twitterClient = new Client(authClient);

console.log("twitterClient", twitterClient);

// Create a new Twitter API client.
// const client = new twitter({
//   consumer_key: 'CONSUMER_KEY',
//   consumer_secret: 'CONSUMER_SECRET',
//   access_token: 'ACCESS_TOKEN',
//   access_token_secret: 'ACCESS_TOKEN_SECRET'
// });

// Set the search query.
// const query = 'genexus';

// Search for tweets that contain the search query.
// const tweets = await client.get('search/tweets', {
//   q: query
// });

// Extract the text of each tweet.
// const tweetTexts = tweets.map(tweet => tweet.text);

// Use a sentiment analysis library to determine the sentiment of each tweet.
// const sentimentAnalyzer = new VaderSentiment();
// const sentiments = tweetTexts.map(sentimentAnalyzer.polarity);

// Calculate the average sentiment of all the tweets.
// const averageSentiment = sentiments.reduce((a, b) => a + b) / sentiments.length;

// Print the average sentiment.
// console.log(averageSentiment);
