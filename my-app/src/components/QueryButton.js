import React, { Component, useState } from 'react';
import './Button.css';
import {useReadCypher} from "use-neo4j";

export function QueryButton() {

    const query = 'MATCH (n: Movie) RETURN n LIMIT 25'

    const resultState = useReadCypher(query, '', 'MovieData')

    // Get `m` from the first row
    //const movie = first.get('m');
    console.log("in QueryButton");
    console.log("Query returns: " + resultState)
    console.log("Still Loading? : " + resultState.loading);
    console.log(resultState)

    return (
        <div></div>
    )
}