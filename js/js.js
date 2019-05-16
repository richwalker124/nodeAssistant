var userArg = process.argv[2];

//Define vars for the different APIs
var sptfy = require('node-spotify-api')
//var fs = require('fs')
var apikeys = require("../apikeys.json")
var omdb = new (require("omdbapi"))(apikeys.omdbkey);

//Use fs to pull API keys so they don't show up on github.


//*************************************************THIS FILE PART ISN'T NEEDED ANYMORE CAUSE THE SOLUTION WAS SO MUCH SIMPLER */
// fs.readFileSync("apikeys.json", 'utf8', function(err, data){
//     if(err){
//         console.log(err);
//     }

//     apikeys = JSON.parse(data)
//     console.log(apikeys)
// })

//Mostly works, need to parse data better cause it's just illegible mess rn.
//Spotify API functionality

var spotify = new sptfy({
    id: apikeys.spotifykey,
    secret: apikeys.spotifysecret
});

// spotify.search({ type:'track', query: 'all the small things', limit: 1})
// .then(function(resp){
//     console.log(JSON.stringify(resp));
// })
// .catch(function(err){
//     console.log(err);
// });


//This code can be deleted before the project is turned in***
//     if (err){
//         console.log('You had an error. Error: ' + err);
//         return
//     }
//     console.log(JSON.stringify(data))
// })
//Delete this b4 turn in***

//OMDB API functionality (Pull up basic info unless there are other arguments.)**************************************

omdb.get({
    title:'Dodgeball'
}).then(res => {
    console.log('response.get : ' + JSON.stringify(res));
}).catch(console.error);

// omdb.get({title: 'Saw'}, true, function(err, movie) {
//     if(err){
//         console.log("It appears there was an error! " + err);
//     }
//     if (!movie){
//         console.log("That movie wasn't found!");
//     }
//     if (movie){
//         console.log('%s (%d) %d/10', movie.title, movie.year, movie.imdb.rating);
//     }
// })

//Once the basics are working use Inquire to streamline inputs
//Have an inquire function that will ask you what you would like to do, and then use parameters for the API to do a search and turn back relevent information. 
//Then the function (function will have a quit option ofc) will call itself again after the process is complete.
