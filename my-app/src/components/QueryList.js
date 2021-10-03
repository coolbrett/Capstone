import React, { useState, useContext } from 'react';
import  Query  from './Query';
import {PerformQuery} from "./PerformQuery";

const QueryList = () => {
    const clear = `MATCH (n) RETURN (n) LIMIT 25`;
    const[minRank, setMinRank] = useState("0");//Used for lower bound of rank query
    const[maxRank, setMaxRank] = useState("1000");//Used for upperbound of rank query

    const[minMeta, setMinMeta] = useState("0");//Used for lower bound of meta query
    const[maxMeta, setMaxMeta] = useState("100");//Used for upperbound of meta query

    const[minRate, setMinRate] = useState("0");//Used for lower bound of rate query
    const[maxRate, setMaxRate] = useState("10");//Used for upperbound of rate query

    //This is to meant to eventually get all values user entered
    //And send them to perform a query
    const handleClick = () => {
        let query = `MATCH (n: Movie)
            WHERE` + minRank + ` <= n.rank <=` + maxRank;

        let end = `RETURN (n)`;




        query = query + end;
        let doing = PerformQuery(query);
    }

    //This is to clear all fields of user input and send a query for
    //The fresh main graph of all nodes and links query
    const handleClick2 = () => {
        setMinRank("0");
        setMaxRank("1000");

        setMinMeta("0");
        setMaxMeta("100");

        setMinRate("0");
        setMaxRate("10");

        //Can add more setting here easily

        //Next is to call a function to run a query
        let doing = PerformQuery(clear);
    }

    return(
        <nav className={"query-list"}>
            <h3 className={"query-list-logo"} >
                <u>Perform Queries: </u>
            </h3>
            <Query name2={" Ranking "} min={minRank} max={maxRank} setMin={setMinRank} setMax={setMaxRank}/>
            <Query name2={"Metascore"} min={minMeta} max={maxMeta} setMin={setMinMeta} setMax={setMaxMeta}/>
            <Query name2={" Rating "} min={minRate} max={maxRate} setMin={setMinRate} setMax={setMaxRate}/>

            <br/>
            <button className={"button"} onClick={handleClick}> Submit </button>
            <a> &nbsp; </a>
            <button className={"button"} onClick={handleClick2}> Reset </button>
        </nav>
    );
};

export default QueryList;