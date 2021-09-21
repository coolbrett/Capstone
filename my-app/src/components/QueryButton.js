import React, { Component, useState } from 'react';
import './Button.css';
import {useReadCypher, useReadTransaction} from "use-neo4j";

export function QueryButton() {

    const query = `MATCH (n: Movie) RETURN n LIMIT 25`
    const params = {title: 'Guardians of the Galaxy'}

    const { resultState, first} = useReadCypher('MovieData');
    const neo4j = require('neo4j-driver')

    const uri = 'neo4j+s://4f877cd8.databases.neo4j.io';
    const user = 'neo4j';
    const password = '1TIT1myoa1kmE-TkrEmeZab6GvLzax8DTif-SW4HFK8';

    const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))

    //console.log(resultState + " Result State");
    //console.log(first + " first");
    // Get `m` from the first row
    //const movie = first.get('m');
   /** console.log("in QueryButton");
    console.log("Query returns: " + resultState)
    console.log("Still Loading? : " + resultState.loading);
    console.log(resultState)*/

    let avg = 0;

    const changing = (async() => {
        let i = 0;
        let time = 0;
        let ending = 0;
        let total = 0;
       // console.time("While")
        while(i<3000) {
            time = window.performance.now();

            const session = driver.session()

            try {
                const readQuery = `MATCH (n: Movie) RETURN n`
                const readResult = await session.readTransaction(tx =>
                    tx.run(readQuery, {})
                )
                readResult.records.forEach(record => {
                    //.get('n')
                    //console.log(`Found movie: ${record.get('n')}`)
                })
            } catch (error) {
                console.error('Something went wrong: ', error)
            } finally {
                await session.close();
            }
            console.log("Done: " + i);
            ending = window.performance.now();
            total = ending - time;
            avg += total;
            //avg += avg + console.timeEnd("While" + i);
            //console.log(avg + " avg check");
            i++;
        }
        console.log("Average:" + avg/3000);
        await driver.close();
    })

    return (
        <div>
            <button type={"submit"} onClick={changing}>Query</button>
        </div>
    )
}