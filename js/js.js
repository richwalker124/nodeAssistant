var userArg = process.argv[2];

//Define vars for the different APIs
var sptfy = require('node-spotify-api')
//var fs = require('fs')
var apikeys = require("./apikeys.json")

//Use fs to pull API keys so they don't show up on github.


//*************************************************THIS FILE PART ISN'T NEEDED ANYMORE CAUSE THE SOLUTION WAS SO MUCH SIMPLER */
// fs.readFileSync("apikeys.json", 'utf8', function(err, data){
//     if(err){
//         console.log(err);
//     }

//     apikeys = JSON.parse(data)
//     console.log(apikeys)
// })


//Spotify API functionality
var spotify = new sptfy({
    id: apikeys.spotifykey,
    secret: apikeys.spotifysecret
});

spotify.search({ type:'track', query: 'all the small things', limit: 1})
.then(function(resp){
    console.log(JSON.stringify(resp.name));
})
.catch(function(err){
    console.log(err);
});



//     if (err){
//         console.log('You had an error. Error: ' + err);
//         return
//     }
//     console.log(JSON.stringify(data))
// })

//OMDB API functionality (Pull up basic info unless there are other arguments.)

//Once the basics are working use Inquire to streamline inputs