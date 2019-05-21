

//Define vars for the different APIs
//Spotify
var sptfy = require('node-spotify-api')
//inquire
var inquire = require('inquirer')
//File that holds api Keys
var apikeys = require("../apikeys.json")
//OMDB API
var omdb = new (require("omdbapi"))(apikeys.omdbkey);

//test var to hold last used function
var lastUsed = null
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

///omdb.get({
    title:'Dodgeball'
//}).then(res => {
    //console.log('response.get : ' + JSON.stringify(res));
//}).catch(console.error);

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
function start(){
inquire.prompt([
    {
    type : "list",
    name : "startProgram",
    message : "Welcome to nodeAssistant! What can I help you with?",
    choices : ["Find a Song or Artist", "Look up a Movie or Show", "Quit"]}
]).then(ans => {
    if(ans.startProgram === "Find a Song or Artist"){
        spotifySearch();
    }else if (ans.startProgram === "Look up a Movie or Show"){
        omdbSearch();
    }else{console.log("Hope I was able to help!")}
})
}

//Option for Looking up a movie or show
function omdbSearch(){
    lastUsed = omdbSearch;
    inquire.prompt([
        {
            type : "input",
            name : "programName",
            message : "What's the name of the TV show or movie you want to find?"
        }
    ]).then(ans => {
        omdb.get({
            title:ans.programName
        }).then(res => {
            var genres = Object.keys(res.genre).map(function(key){
                return[res.genre[key]];
            })
            var actors  = Object.keys(res.actors).map(function(key){
                return[res.actors[key]]
            })
            console.log(`\n*******************************************\n${res.title}\nRelease Date: ${res.year}\nGenre: ${genres.splice(0).join(", ").trim()}
            \nCast: ${actors.splice(0).join(", ").trim()}\nCountry of Origin: ${res.country}\nPlot Summary: ${res.plot}`);

            restartSearch();
        }).catch(console.error);
    })
    //lastUsed();
}

//Function for searching spotify
function spotifySearch(){
    lastUsed = spotifySearch;
    inquire.prompt([
        {
            type : "list",
            name: "mediaType",
            message : "What kind of music do you want to search for?",
            choices : ["Track", "Album", "Artist"]   
        },
        {
            type : "input",
            name: "mediaName",
            message : "What is the name of the media?",
        }

    ]).then(ans => {
        
        spotify.search({ type:ans.mediaType.toLowerCase(), query: ans.mediaName, limit: 1})
.then(function(resp){
    //results = JSON.parse(resp)
   
    if(ans.mediaType === "Artist"){
    var genres = resp.artists.items[0].genres.splice(0).join(", ").trim()
    console.log(`\n${resp.artists.items[0].name}\n
    Genres: ${genres}\n
    Followers on Spotify: ${resp.artists.items[0].followers.total}
    `)}
    if(ans.mediaType === "Track"){
        console.log("\nTrack Title: " + resp.tracks.items[0].name)
        console.log("Artist: " + resp.tracks.items[0].artists[0].name)
    }
    if(ans.mediaType === "Album"){
        console.log("\nAlbum Title: " + resp.albums.items[0].name)
        console.log("Artist: " + resp.albums.items[0].artists[0].name)
        console.log("Release Date: " + resp.albums.items[0].release_date)
    }
   // console.log(JSON.stringify(resp))
    //console.log(resp.albums.items[0]);
    //console.log(resp.albums.items[0]);
    
})
.catch(function(err){
    console.log(err);
});
    restartSearch();
    })
}

function restartSearch(){
    inquire.prompt([
        {
            type : "list",
            name: "ans",
            message : "Would you like to search again?",
            choices : ["Yes.", "No."]
        }
    ]).then(resp => {
        if (resp.ans === "Yes."){
            lastUsed();
        }else{
            start();
        }
    })
}
start()