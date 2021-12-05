import React, { useState, useContext } from 'react';
import  Query  from './Query';
import ShowInfo from './ShowInfo';
import emptyGraph from "./emptyGraph.json"
import {NodeContext} from "./NodeContext";

import limit from "./limit.json"
import myData from '../Data/nodesInfo2.json'
import { Neo4jProvider, createDriver } from 'use-neo4j'
// Create driver instance
const driver = createDriver('bolt', 'localhost', 7687, 'dmgorlesky', '977238')
//const driver = createDriver('bolt', 'localhost', 7687, 'brett', 'brett123')

const QueryList = (props) => {
    let context = useContext(NodeContext);
    let [theData, setTheData] = context;

    const[minRank, setMinRank] = useState("1");//Used for lower bound of rank query
    const[maxRank, setMaxRank] = useState("1000");//Used for upperbound of rank query

    const[minMeta, setMinMeta] = useState("0");//Used for lower bound of meta query
    const[maxMeta, setMaxMeta] = useState("100");//Used for upperbound of meta query

    const[minRate, setMinRate] = useState("0");//Used for lower bound of rate query
    const[maxRate, setMaxRate] = useState("10");//Used for upperbound of rate query


    let combined = function (obj){
        console.log("Movie object being added below")
        console.log(obj);

        let data = {'nodes': [], 'links': []};

        console.log("length of obj: " + Object.keys(obj).length);
        for (let i = 0; i < Object.keys(obj).length; i++) {

            //nodes
            for (let j = 0; j < obj[i].nodes.length; j++){
                data.nodes.push(obj[i].nodes[j]);
            }

            //links
            for (let j = 0; j < obj[i].links.length; j++){
                data.links.push(obj[i].links[j]);
            }
        }
        return data;
    }

    //This is to meant to eventually get all values user entered
    //And send them to perform a query
    const handleClick = async () => {
        //"file:///C:/Users/dillo/Desktop/Capstone2/Capstone/my-app/src/components/limit.json"

        let query = `CALL apoc.export.json.query("MATCH (m:Movie)
        WHERE m.rank >= ${minRank} AND m.rank <= ${maxRank} 
        AND m.rating >= ${minRate} AND m.rating <= ${maxRate} 
        AND m.metascore >= ${minMeta} AND m.metascore <= ${maxMeta}
CALL apoc.path.subgraphAll(m, {maxLevel:1}) YIELD nodes, relationships
WITH [node in nodes | node {.*, id:node.name, label:labels(node)[0]}] as nodes, 
     [rel in relationships | rel {.*, source:startNode(rel).name, target:endNode(rel).name}] as rels
RETURN nodes, rels as links"
        , "file:///C:/Users/dillo/Desktop/Capstone2/Capstone/my-app/src/components/limit.json", {jsonFormat: 'ARRAY_JSON'})`

/**
        let query = `CALL apoc.export.json.query("MATCH (m:Movie)
        WHERE m.rank >= ${minRank} AND m.rank <= ${maxRank} AND m.rating >= ${minRate} AND m.rating <= ${maxRate} AND m.metascore >= ${minMeta} AND m.metascore <= ${maxMeta}
CALL apoc.path.subgraphAll(m, {maxLevel:1}) YIELD nodes, relationships
WITH [node in nodes | node {.*, id:node.name, label:labels(node)[0]}] as nodes, 
     [rel in relationships | rel {.*, source:startNode(rel).name, target:endNode(rel).name}] as rels
RETURN nodes, rels as links"
        , "file:///C:/Users/brett/WebstormProjects/Capstone_1/Capstone/my-app/src/components/limit.json", {jsonFormat: 'ARRAY_JSON'})`
*/

        let session = driver.session()

        let readResult = await session.readTransaction(tx =>
            tx.run(query, {})
        )

        let allMovies = combined(emptyGraph)
        setTheData(allMovies);

        allMovies = combined(limit);
        setTheData(allMovies);
        theData = allMovies;

        console.log("-------------------");

       //await driver.close();
    }

    //This is to clear all fields of user input and send a query for
    //The fresh main graph of all nodes and links query
    const handleClick2 = async () => {
        setMinRank("1");
        setMaxRank("1000");

        setMinMeta("0");
        setMaxMeta("100");

        setMinRate("0");
        setMaxRate("10");

        let query = `CALL apoc.export.json.query("MATCH (m:Movie)
CALL apoc.path.subgraphAll(m, {maxLevel:1}) YIELD nodes, relationships
WITH [node in nodes | node {.*, id:node.name, label:labels(node)[0]}] as nodes, 
     [rel in relationships | rel {.*, source:startNode(rel).name, target:endNode(rel).name}] as rels
RETURN nodes, rels as links"
        , "file:///C:/Users/dillo/Desktop/Capstone2/Capstone/my-app/src/components/limit.json", {jsonFormat: 'ARRAY_JSON'})`

        let session = driver.session()

        let readResult = await session.readTransaction(tx =>
            tx.run(query, {})
        )
/**
        let allMovies = combined(emptyGraph)
        setTheData(allMovies);

        allMovies = combined(limit);
        setTheData(allMovies);
        theData = allMovies;*/
        let val = Math.floor(Math.random() * 100);
        //Can add more setting here easily



      /**  let allMovies = combined(emptyGraph)
        setTheData(allMovies);

        allMovies = combined(myData);
        setTheData(allMovies)*/
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

            <a> &nbsp; </a>
            <ShowInfo val={props.nodeI}/>
        </nav>
    );
};

export default QueryList;