import React, {useRef, Component, useContext, useState} from 'react';
import { Graph } from 'react-d3-graph'
import "./graph.const"
import "./GraphView.css"
import QueryList from "./QueryList"
import { NodeContext } from "./NodeContext.js";

import DEFAULT_CONFIG from "./graph.config"
import myData from '../Data/scratch.json'
//import myData from '../Data/nodesInfo2.json'
let id = "Chris Pratt"

const GraphView = (e) => {
        let data = myData;
        let context = useContext(NodeContext);
        //This is setting the previously clicked node to be stored elsewhere so Navbar can see it
        let [nodeId, setClickedNode] = context;
        //This is setting the previously clicked node to be stored elsewhere
        let [prevId, setPrevId] = context;


        const setData = function(dataHere){
                data = dataHere;
        }

        const getColor = function(clickedNode){
                if(clickedNode.color === "blue"){
                        return 0;
                }
                return 1;
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



        const onClickNode = function(nodeID) {
                /**
                 * Send query
                 * -> get info back
                 * create the nodes
                 * create links
                 * populate view
                 * @type {{nodes: {}, links: {}}}
                 */
                let modData = {...myData};
                let selectNode = modData.nodes.filter(item => {
                        return item.id === nodeID;
                });
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
                setClickedNode(nodeID);
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
            <QueryList />
            </div>
        );
}
export default GraphView;