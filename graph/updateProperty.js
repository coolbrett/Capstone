/**
 * This file's purpose is to be ran if we want to add and/or update a property
 * or properties to existing nodes in the Neo4j database
 *
 * @author Brett Dale
 * @author Dillon Gorlesky
 * @version 1.0 (10/2/2021)
 */

(async() => {
    const neo4j = require('neo4j-driver')
    const fs = require("fs");

    const uri = 'neo4j+s://4f877cd8.databases.neo4j.io';
    const user = 'neo4j';
    const password = '1TIT1myoa1kmE-TkrEmeZab6GvLzax8DTif-SW4HFK8';

    const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
    const session = driver.session()

    let data = fs.readFileSync("Data/MovieData.json", "utf-8");
    let obj = JSON.parse(data);

    /**
     * updates node properties
     */
    for (let i = 0; i < obj.length; i++) {
        let movie = obj[i]['Title'];
        let director = obj[i]['Director'];
        let rank = obj[i]['Rank'];
        let genres = obj[i]["Genre"];
        let description = obj[i]["Description"];
        let year = obj[i]["Year"];
        let runtime = obj[i]["Runtime (Minutes)"];
        let rating = obj[i]["Rating"];
        let votes = obj[i]["Votes"];
        let revenue = obj[i]["Revenue (Millions)"];
        let metascore = obj[i]["Metascore"];

        /* if you need to add properties to actors
        for (let j = 0; j < obj[i]['Actors'].length; j++) {
            console.log(obj[i]['Actors'][j] + " plays in " + movie);
        } */

        //writeQuery is where the query needs to be
        const writeQuery = 'MATCH (n {name: $movie}) SET n.director = $director RETURN n.name, n.director';
        console.log(writeQuery);

        // Write transactions allow the driver to handle retries and transient errors
        const writeResult = await session.writeTransaction(tx =>
            //add actor variable here if adding properties to actors
            tx.run(writeQuery, {movie, director, rank, genres, description, year, runtime, rating, votes, revenue, metascore})
        )
        writeResult.records.forEach(record => {
            console.log(record.get('n.name'));
            const movieNode = record.get('n.name');
            console.log(
                `Movie: ${movieNode.properties.name} now has ${movieNode.properties.director} as director`
            )
        })


        const readQuery = `MATCH (p:Person)
                      WHERE p.name = $personName
                      RETURN p.name AS name`
        const readResult = await session.readTransaction(tx =>
            tx.run(readQuery, {personName: actor})
        )
        readResult.records.forEach(record => {
            console.log(`Found person: ${record.get('name')}`)
        })

        if (i > 0){
            break;
        }
    }
})();