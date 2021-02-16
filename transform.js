/**
 This file is to convert CSV to JSON, as well as manipulate our JSON files into usable data.
 @author Brett Dale
 @author Dillon Gorlesky
 @version 1.0 (2/15/2021)
 **/

const CSVToJSON = require('csvtojson');
const fs = require("fs");
const FileSystem = require("fs");

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
            fs.writeFile('rawMovieData.json', JSON.stringify(movies, null, 4), (err) => {
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
function createActorsArrayInJSON(filePath){
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
        FileSystem.writeFile('MovieData.json', JSON.stringify(obj, null, 4), (error) => {
            if (error) throw error;
        });
    }
}

/**
 * Main function to manipulate the JSON data file
 */
function main(){
    convertCSVToJSON('IMDB-Movie-Data.csv');
    createActorsArrayInJSON('rawMovieData.json');
}

main();
