/**
 This file is to convert CSV to JSON, as well as manipulate our JSON files into usable data.
 @author Brett Dale
 @author Dillon Gorlesky
 @version 1.0 (2/15/2021)
 **/

const CSVToJSON = require('csvtojson');
const fs = require("fs");

/**
 * Converts CSV file to a JSON file
 * @param {String} filePath file path of CSV file to be converted to JSON
 */
function convertCSVToJSON(filePath) {
    if (typeof filePath !== "string") {
        throw new Error("convertCSVToJSON; filePath is not string")
    } else {

        // convert file to JSON array
        CSVToJSON().fromFile(filePath).then(movies => {
            fs.writeFile('Data/rawMovieData.json', JSON.stringify(movies, null, 4), (err) => {
                if (err) {
                    throw err;
                }
                console.log("JSON file is saved.");
            });
        })
    }
}

/**
 * When the CSV's get converted to JSON, the actors and genres attributes for each movie is just a string. This function
 * separates each actor and genre into a list while also clearing leading/trailing whitespace.
 * @param {String} filePath file path of JSON to go through
 */
function createArraysInJSON(filePath){
    if (typeof filePath !== 'string'){
        throw new Error("createActorsInJSON; filePath is not string");
    }else {
        //getting JSON into an object
        let data = fs.readFileSync(filePath, "utf-8");
        let obj = JSON.parse(data);

        //start looping through all movies
        for (let i = 0; i < obj.length; i++) {
            let actors = obj[i]['Actors'];
            let genres = obj[i]['Genre'];
            let actorsArray = actors.split(',');
            let genresArray = genres.split(',');

            //get list of actors and genres in current movie with no leading/trailing whitespace
            for (let j = 0; j < actors.length; j++) {
                if (actorsArray[j] !== undefined) {
                    actorsArray[j] = actorsArray[j].trim()
                } else {
                    j = actors.length
                }
            }

            for (let k = 0; k < genresArray.length; k++){
                if (genresArray[k] !== undefined){
                    genresArray[k] = genresArray[k].trim();
                }else{
                    k = genresArray.length;
                }
            }

            //put new lists in JSON object with correct movie
            obj[i]['Actors'] = actorsArray;
            obj[i]['Genre'] = genresArray;
        }

        //write object into a JSON file
        fs.writeFile('Data/MovieData.json', JSON.stringify(obj, null, 4), (error) => {
            if (error) throw error;
        });
    }
}

/**
 * This function will link all movies to their actors
 * @param {String} filePath file to generate nodes and links from
 */
function generateNodesAndLinks(filePath){
    if (typeof filePath != 'string'){
        throw new Error("generateNodesAndLinks; filePath is not a string");
    }else{
        //getting JSON into an object
        let data = fs.readFileSync(filePath, "utf-8");
        let movies = JSON.parse(data);

        let nodes = [];
        let links = [];
        let container = [{nodes, links}];

        for (let i = 0; i < movies.length; i++){
            let temp = {};
            temp['name'] = movies[i]['Title'];
            temp['id'] = movies[i]['Rank'];
            nodes.push(temp);
            for (let j = 0; j < movies[i]['Actors'].length; j++){
                let actor = {};
                actor['name'] = movies[i]['Actors'][j]
                nodes.push(actor);

                let link = {};
                link['source'] = movies[i]['Title'];
                link['target'] = actor['name'];
                links.push(link);
            }
        }
        fs.writeFile('Data/nodes.json', JSON.stringify(container, null, 3), (error) => {
            if (error) throw error;
        });
    }
}

/**
 * Main function to manipulate the JSON data file
 */
function main(){
    //the timeouts are needed to give time for JS to process the newly created files being made
    convertCSVToJSON('Data/IMDB-Movie-Data.csv');
    setTimeout(() => {
        createArraysInJSON('Data/rawMovieData.json');
    }, 500)
    setTimeout(() => {
        generateNodesAndLinks('Data/MovieData.json');
    }, 1000);
}

main();
