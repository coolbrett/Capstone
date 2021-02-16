/**
 This file is to just convert our csv data file into a JSON file.
 @author Brett Dale
 @author Dillon Gorlesky
 @version 1.0 (2/15/2021)
 **/

const CSVToJSON = require('csvtojson');
const fs = require("fs");

// convert file to JSON array
CSVToJSON().fromFile('IMDB-Movie-Data.csv').then(movies => {
    fs.writeFile('MovieData.json', JSON.stringify(movies, null, 4), (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON file is saved.");
    });
})
