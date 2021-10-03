import React, { useState, useContext } from 'react';

/**
 * These values are the constants that allow us to connect to the database and never change.
 * Putting them up here allows ofr them to not have to be initialized every time a query is
 * being executed.
 *
 * Ideally this speeds up processing time.
 */
const neo4j = require('neo4j-driver')
const uri = 'neo4j+s://4f877cd8.databases.neo4j.io';
const user = 'neo4j';
const password = '1TIT1myoa1kmE-TkrEmeZab6GvLzax8DTif-SW4HFK8';
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

/**
 * This function is meant to get a query to run, and gets the results back from the database.
 *
 * Will eventually be configured to convert the data into a readable state to then update the graph
 * being displayed
 *
 * @param query: The query passed that will be read in and executed.
 * @constructor
 */
export async function PerformQuery(query) {
    const session = driver.session()

    const readResult = await session.readTransaction(tx =>
        tx.run(query, {})
    )

    readResult.records.forEach(record => {
        //console.log(`Found movie: ${record.get('n')}`)
    })

    await driver.close();

    console.log("-------------------");

    console.log(readResult.records.list);

    //Now it needs to put the records into a readable state, and then can either be stored in a new
    //JSON file or a new graph to be displayed to the user.
}
/**
 * This function allows for a json to be formatted that can be downloaded by the user. Not
 * sure how it helps, if at all, but it's here
 *
 const handleSaveToPC = jsonData => {
  const fileData = JSON.stringify(jsonData);
  const blob = new Blob([fileData], {type: "text/plain"});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = 'filename.json';
  link.href = url;
  link.click();
}
 */