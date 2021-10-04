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

const GraphView = (props) => {
        let context = useContext(NodeContext);
        //This is setting the previously clicked node to be stored elsewhere so Navbar can see it
        let [nodeId, setClickedNode] = context;
        //This is setting the previously clicked node to be stored elsewhere
        let [prevId, setPrevId] = context;
        let [theData, setTheData] = context;

        if(theData.length === 1){
                setTheData(myData);
        }

        const setData = function(dataHere){
                setTheData(dataHere);
        }

        const myConfig = {
                nodeHighlightBehavior: true,
                height: 800,
                width: 1400,
                //height: 500,
                //width: 1000,
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
                console.log("Selected ID: " + nodeID);

                let modData = {...theData};
                let selectNode = modData.nodes.filter(item => {
                        return item.id === nodeID;
                });
                console.log("Noding: " + modData.nodes)
                console.log("Select Node: " + selectNode.id)
                selectNode.forEach(item => {
                        if(item.color === undefined){
                                item.color = "red";
                        }
                        //If clicked node isn't the previously clicked node
                                //Setting the color of the node clicked to opposite color
                        if(item.color === "red") {
                                item.color = "blue";
                        } else {
                                item.color = "red";
                        }
                        if(item.id !== prevId) {
                                //Getting previous node id
                                let selectPrev = modData.nodes.filter(items => {
                                        return items.id === prevId;
                                });

                                //This is where the previous node is switched back to red
                                selectPrev.forEach(items => {
                                        items.color = "red";
                                });
                                setPrevId(nodeID);
                        } else {
                                //Setting the previous node to be empty
                                //For whatever reason it only works if I do this
                                setPrevId("");
                        }
                });
                console.log("Selected ID: " + nodeID);
                setClickedNode(nodeID);
                setData(modData);
        };

        return (
            <div className={"graphview"}>
                <Graph
                        id={'graph-id'} // id is mandatory, if no id is defined rd3g will throw an error
                        data={theData}
                        config={myConfig}
                        onClickNode={onClickNode}
                />
                <QueryList />
            </div>
        );
}
export default GraphView;