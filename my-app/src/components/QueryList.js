import React, { useState, useContext } from 'react';
import  Query  from './Query';
import {PerformQuery} from "./PerformQuery";
import {NodeContext} from "./NodeContext";
import someData from '../Data/test.json'
import someData2 from '../Data/scratch.json'
import myData from '../Data/nodesInfo2.json'



const neo4j = require('neo4j-driver')
const uri = 'neo4j+s://4f877cd8.databases.neo4j.io';
const user = 'neo4j';
const password = '1TIT1myoa1kmE-TkrEmeZab6GvLzax8DTif-SW4HFK8';
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

const QueryList = () => {
    const scratch = '{nodes:[{id:Guardians of the Galaxy},{id:Chris Pratt},{id:Vin Diesel},{id:Bradley Cooper},{id:Zoe Saldana}],links:[{source:Guardians of the Galaxy,target: Chris Pratt},{source:Guardians of the Galaxy,target:Vin Diesel},{source:Guardians of the Galaxy,target:Bradley Cooper},{source:Guardians of the Galaxy,target:Zoe Saldana}]}'
    let context = useContext(NodeContext);
    let [theData, setTheData] = context;

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
        //let doing = PerformQuery(query, props.data);
    }

    //This is to clear all fields of user input and send a query for
    //The fresh main graph of all nodes and links query
    const handleClick2 = async () => {
        setMinRank("0");
        setMaxRank("1000");

        setMinMeta("0");
        setMaxMeta("100");

        setMinRate("0");
        setMaxRate("10");

        let val = Math.floor(Math.random() * 100);
        //Can add more setting here easily

        if(val < 50){
            console.log("test")
            setTheData(someData);
        } else {
            console.log("scratch")
            setTheData(someData2);
        }

        //setTheData(myData)
        //Next is to call a function to run a query

        /*const session = driver.session()

        const readResult = await session.readTransaction(tx =>
            tx.run(clear, {})
        )

        readResult.records.forEach(record => {
            //console.log(`Found movie: ${record.get('n')}`)
        })
        console.log("-------------------");
        console.log("Nodes array: " + readResult.records);
        console.log("Node name: " + readResult.records[0]._fields[0].properties.name);*/

        await driver.close();
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