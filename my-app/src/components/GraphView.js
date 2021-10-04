import React, {useRef, Component, useContext, useState} from 'react';
import { Graph } from 'react-d3-graph'
import "./graph.const"
import "./GraphView.css"
import QueryList from "./QueryList"
import { NodeContext } from "./NodeContext.js";

import DEFAULT_CONFIG from "./graph.config"
import {useEffect} from "react/cjs/react.production.min";
import myData from '../Data/scratch.json'
//import myData from '../Data/test.json'
//import myData from '../Data/nodesInfo2.json'

const GraphView = () => {
        let sureData = myData
        let context = useContext(NodeContext);
        //This is setting the previously clicked node to be stored elsewhere so Navbar can see it
        let [nodeHere, setClickedNode] = context;
        //This is setting the previously clicked node to be stored elsewhere
        let [prevId, setPrevId] = context;
        let [theData, setTheData] = context;
        /**if(theData === undefined){
                data = sureData
                console.log("Undefined data: " + theData);
                console.log("Undefined data2: " + data);
        } else {
                if(theData.length === 1){
                        setTheData(myData)
                }
                console.log("here")
        }*/
        console.log("BEGINNING IS HERE----------------------")
        console.log("MyData: " + myData)
        //setTheData(myData)
        console.log("TheData: " + theData)


        const setData = function(dataHere){
                setTheData(dataHere);
        }

        const myConfig = {
                nodeHighlightBehavior: true,
               // height: 800,
                //width: 1400,
                height: 500,
                width: 800,
                node: {
                        color: "red",
                        size: 120,
                        highlightStrokeColor: "blue"
                },
                link: {
                        highlightColor: "lightblue"
                }
        };
        const onClickNode = function(nodeID) {
                setTheData(myData)
                console.log("-------------------------------------------------")
                //console.log("My Data Clicked Node: " + data.nodes)
                let modData = {...theData};
                let selectNode = modData.nodes.filter(item => {
                        if(item.id === nodeID) {
                                return item.id;
                        }
                });
                selectNode.forEach(item => {
                        if(item.color === 'undefined'){
                                item.color = "red";
                        }
                        //If clicked node isn't the previously clicked node
                                //Setting the color of the node clicked to opposite color
                        if(item.color === "red") {
                                item.color = "blue";
                        } else {
                                item.color = "red";
                        }

                        // console.log("here!!!!!!!!!!!!!!!!!!")
                        if(item.id !== prevId) {
                                //Getting previous node id
                          //      console.log("SET PREV NODE 1")

                                let selectPrev = modData.nodes.filter(items => {
                                        return items.id === prevId;
                                });

                                //This is where the previous node is switched back to red
                                selectPrev.forEach(items => {
                                        items.color = "red";
                                });

                                console.log("Checking id: " +nodeID)

                                setPrevId(nodeID);
                                console.log("test")
                        } else {
                                //Setting the previous node to be empty
                                //For whatever reason it only works if I do this
                                setPrevId("");
                        }
                });

                //console.log("Selected ID: " + nodeID);
                setClickedNode(nodeID, theData);
                setData(theData);
        };

        return (
            <div className={"graphview"}>
                <Graph
                        id={'graph-id'} // id is mandatory, if no id is defined rd3g will throw an error
                        data={myData}
                        config={myConfig}
                        onClickNode={onClickNode}
                />
                <QueryList />
            </div>
        );
}
export default GraphView;