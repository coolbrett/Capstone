
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
     * Below is code to demonstrate iteration and retrieval
     *
    for (let i = 0; i < obj.length; i++){
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
        console.log("\nMovie is: " + movie + "\nDirected by: "+ director + "\n--------------");
        console.log("Rank: " + rank);
        console.log("Genres: " + genres);
        console.log("Description: " + description);
        console.log("Year: " + year);
        console.log("Runtime: " + runtime);
        console.log("Rating: " + rating);
        console.log("Votes: " + votes);
        console.log("Revenue: " + revenue);
        console.log("Metascore: " + metascore);
        console.log("--------------")
        for (let j = 0; j < obj[i]['Actors'].length; j++){
            console.log(obj[i]['Actors'][j] + " plays in " + movie);
        }

        if (i > 1){
            break
        }
    } */


    /**
     * THIS CODE BUILDS THE ENTIRE GRAPH ON NEO4J
     */


    //try-catch-finally is necessary
    try {
        //This may be able to be condensed down to one loop
        //first loop just grabs movie title (maybe can be
        for (let i = 0; i < obj.length; i++) {
            //Movie properties set below
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


            //This loop iterates through each actor and assigns the actors to their movie
            for (let j = 0; j < obj[i]['Actors'].length; j++) {
                //I wrote the next three lines
                let actor = obj[i]['Actors'][j];
                const writeQuery = 'MERGE (p1:Actor { name: $actor }) MERGE (p2:Movie { name: $movie, director: $director, rank: $rank, genres: $genres, description: $description, year: $year, runtime: $runtime, rating: $rating, votes: $votes, revenue: $revenue, metascore: $metascore }) MERGE (p1)-[:STARS]->(p2) RETURN p1, p2';
                console.log(writeQuery)

                //BELOW CODE IS NEO4J STUFF, I only touched variable names

                // Write transactions allow the driver to handle retries and transient errors
                const writeResult = await session.writeTransaction(tx =>
                    tx.run(writeQuery, {actor, director, movie, rank, genres, description, year, runtime, rating, votes, revenue, metascore})
                )
                writeResult.records.forEach(record => {
                    const person1Node = record.get('p1')
                    const person2Node = record.get('p2')
                    console.log(
                        `Created friendship between: ${person1Node.properties.name}, ${person2Node.properties.name}`
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

            }

            //director query here
            const writeQuery = 'MERGE (p1:Director { name: $director }) MERGE (p2:Movie { name: $movie }) MERGE (p1)-[:DIRECTED]->(p2) RETURN p1, p2';
            console.log("\n" + writeQuery);

            //BELOW CODE IS NEO4J STUFF, I only touched variable names

            // Write transactions allow the driver to handle retries and transient errors
            const writeResult = await session.writeTransaction(tx =>
                tx.run(writeQuery, {director, movie})
            )
            writeResult.records.forEach(record => {
                const person1Node = record.get('p1')
                const person2Node = record.get('p2')
                console.log(
                    `Created friendship between: ${person1Node.properties.name}, ${person2Node.properties.name}`
                )
            })

            const readQuery = `MATCH (p:Person)
                      WHERE p.name = $personName
                      RETURN p.name AS name`
            const readResult = await session.readTransaction(tx =>
                tx.run(readQuery, {personName: director})
            )
            readResult.records.forEach(record => {
                console.log(`Found person: ${record.get('name')}`)
            })

        }
    }catch (error){
        console.error("Something went wrong: ", error);
    }finally {
        await session.close();
    }


    // Don't forget to close the driver connection when you're finished with it
    await driver.close()
})();