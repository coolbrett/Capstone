import React, {useRef, Component, useContext, useState} from 'react';
import { Graph } from 'react-d3-graph'
import "./graph.const"
import "./GraphView.css"
import {NodeContext} from "./NodeContext.js";
import {PrevContext} from "./PrevContext.js";

import DEFAULT_CONFIG from "./graph.config"
import myData from '../Data/scratch.json'
//import myData from '../Data/nodesInfo2.json'

const GraphView = () => {
        let data = myData;
        let prevClicked = "";
        let context = useContext(NodeContext);
        //This is setting the previously clicked node to be stored elsewhere so Navbar can see it
        let [nodeId, setClickedNode] = context;
        //This is setting the previously clicked node to be stored elsewhere
        let [prevId, setPrevId] = useContext(PrevContext);


        const setData = function(dataHere){
                data = dataHere;
        }

        const myConfig = {
                nodeHighlightBehavior: true,
                height: 960,
                width: 1850,
                node: {
                        color: "red",
                        size: 120,
                        highlightStrokeColor: "blue"
                },
                link: {
                        highlightColor: "lightblue"
                }
        };

        let inside = "";
        const onClickNode = function(nodeID) {
                console.log("------");
                console.log(prevId);
                let modData = {...data};
                let selectNode = modData.nodes.filter(item => {
                        return item.id === nodeID;
                });
                selectNode.forEach(item => {
                        //If clicked node isn't the previously clicked node
                        if(item.id !== prevId){
                                inside = item.id;
                                //Setting the color of the node clicked to opposite color
                                item.color = "blue";

                                //Getting previous node id
                                let selectPrev = modData.nodes.filter(items => {
                                        return items.id === prevId;
                                });

                                //This is where the previous node is switched back to red
                                selectPrev.forEach(items => {
                                                items.color = "red";
                                });
                        } else {
                                if (item.color === "blue"){
                                        console.log("here");
                                        item.color = "red";
                                } else {
                                        console.log("here2");
                                        item.color = "blue";
                                }
                        }
                });
                setClickedNode(nodeID);
                setPrevId(nodeID);
                setData(modData);
        };

        return (
            <div className={"graphview"} >
            <Graph
                id={'graph-id'} // id is mandatory, if no id is defined rd3g will throw an error
                data={myData}
                config={myConfig}
                onClickNode={onClickNode}
            />
            </div>
        );
}
export default GraphView;