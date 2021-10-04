import React, {useRef, Component, useContext, useState} from 'react';
import { Graph } from 'react-d3-graph'
import "./graph.const"
import "./GraphView.css"
import QueryList from "./QueryList"
import { NodeContext } from "./NodeContext.js";

import DEFAULT_CONFIG from "./graph.config"
//import myData from '../Data/scratch.json'
//import myData from '../Data/test.json'
//import myData from '../Data/nodesInfo2.json'

const GraphView = (props) => {
        let time = props.time;
        let context = useContext(NodeContext);
        //This is setting the previously clicked node to be stored elsewhere so Navbar can see it
        let [nodeId, setClickedNode] = context;
        //This is setting the previously clicked node to be stored elsewhere
        let [prevId, setPrevId] = context;
        let [theData, setTheData] = context;
        let [timing, setTiming] = context;
        if(props.time.equals("1")){
                setTheData(props.data);
                setTiming(0);
        } else {
                setTheData(theData);
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
        let modData = {...theData};
        const onClickNode = function(nodeID, theData) {
                /**
                 * Send query
                 * -> get info back
                 * create the nodes
                 * create links
                 * populate view
                 * @type {{[p: string]: *}}
                 */
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
            <div className={"graphview"}>
                <Graph
                        id={'graph-id'} // id is mandatory, if no id is defined rd3g will throw an error
                        data={theData}
                        config={myConfig}
                        time={time}
                        onClickNode={() => NodeContext(onClickNode)}
                />
                <QueryList />
            </div>
        );
}
export default GraphView;