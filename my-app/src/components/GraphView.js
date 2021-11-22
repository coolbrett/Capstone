import React, {useRef, Component, useContext, useState} from 'react';
import Graph from '../react-d3-graph/src/components/graph/Graph'
import "./graph.const"
import "./GraphView.css"
import QueryList from "./QueryList"
import { NodeContext } from "./NodeContext.js";

import DEFAULT_CONFIG from "./graph.config"
import {useEffect} from "react/cjs/react.production.min";
import myData from '../Data/scratch.json'
import * as url from "url";
//import axios from "axios";
//import myData from '../Data/test.json'
//import myData from '../Data/nodesInfo2.json'

let last = "";
const GraphView = (props) => {
        const[nodeInfo, setNodeInfo] = useState("");
        const[val, setVal] = useState(0);


        let last2 = props.valueFromParent
        console.log(last2 + " last 2")
        let context = useContext(NodeContext);
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
                width: 1500,
                //height: 500,
                //width: 700,
                maxZoom: 9000,
                minZoom: .1,
                highlightDegree: 1,
                node: {
                        color: "red",
                        size: 120,
                        strokeWidth: 1.5,
                        fontSize: 8,
                        highlightStrokeColor: "blue"
                },
                link: {
                        highlightColor: "lightblue"
                }
        };


        const onClickNode = function(nodeID) {
                let modData = {...theData};
                /**
                 * Send query
                 * -> get info back
                 * create the nodes
                 * create links
                 * populate view
                 * @type {{[p: string]: *}}
                 */

                console.log("IN GraphView");
                console.log(modData)
                //if JSON was a collection, we could nest the code below, may fix our app breaking when we have more than one movie
                let selectNode = modData.nodes.filter(item => {
                        //console.log(item);
                        return item.id === nodeID;
                });
                selectNode.id = nodeID + "";
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
                        if(item.id !== last) {
                                //Getting previous node id
                                let selectPrev = modData.nodes.filter(items => {
                                        return items.id === last;
                                });

                                //This is where the previous node is switched back to red
                                selectPrev.forEach(items => {
                                        items.color = "red";
                                });
                                last = item.id;
                                //setPrevId(item.id);
                        } else {
                                //Setting the previous node to be empty
                                //For whatever reason it only works if I do this
                                item.color = "red"
                                last = "";
                        }
                });
                //setClickedNode(selectNode);
                props.functionCallFromParent(last);
                //console.log(modData)
                setData(modData);
        };


        /**
         * Called when the graph's zoom changes
         * @param {number} prevZoom Previous zoom level
         * @param {number} newZoom New zoom level
         */
            // Callback that's called whenever the graph is zoomed in/out
// @param {number} previousZoom the previous graph zoom
// @param {number} newZoom the new graph zoom
        const onZoomChange = function(previousZoom, newZoom) {
                    console.log(`Graph is now zoomed at ${newZoom} from ${previousZoom}`);
            };

        const onClickGraph = function(event) {
                console.log('Clicked the graph background');
        };


        const onDoubleClickNode = function(nodeId, node) {
                console.log('Double clicked node ${nodeId} in position (${node.x}, ${node.y})');
        };

        const onRightClickNode = function(event, nodeId, node) {
              console.log('Right clicked node ${nodeId} in position (${node.x}, ${node.y})');
        };

        const onMouseOverNode = function(nodeId, node) {
              //console.log(`Mouse over node ${nodeId} in position (${node.x}, ${node.y})`);
              console.log(node);
              let s = `Name: ` + node.id
                s += "\nLabel: " + node.label
                if(node.label === "Movie") {
                        s += "\nDirector: " + node.director
                        s += "\nGenres: " + node.genres
                        s += "\nActors: "
                        let i = 0;
                        for (const [index, value] of node.actors) {
                                if(i >= 2){
                                        if(i === 2) {
                                                s += "\n" + node.actors[i] + ", "
                                        } else {
                                                s += node.actors[i]
                                        }
                                        i++
                                } else {
                                        if(i !== 4) {
                                                s += node.actors[i] + ", "
                                                i++
                                        } else {
                                                s += node.actors[i]
                                        }
                                }
                        }
                        s += "\nMetascore: " + node.metascore + "/100"
                        s += "\nRevenue: " + node.revenue + "M"
                        s += "\nRuntime: " + node.runtime + " min"
                        s += "\nRating: " + node.rating + "/10"
                }
              setNodeInfo(s)
        };

        const onMouseOutNode = function(nodeId, node) {
                console.log(`Mouse out node ${nodeId} in position (${node.x}, ${node.y})`);
        };

        const onClickLink = function(source, target) {
              console.log(`Clicked link between ${source} and ${target}`);
        };

        const onRightClickLink = function(event, source, target) {
              console.log('Right clicked link between ${source} and ${target}');
         };
        const onMouseOverLink = function(source, target) {
              console.log(`Mouse over in link between ${source} and ${target}`);
         };

        const onMouseOutLink = function(source, target) {
              console.log(`Mouse out link between ${source} and ${target}`);
         };




        const childFunction = (e) =>{
                e.preventDefault();
                this.props.functionCallFromParent(last);
                //http://localhost:3000/www.test.com
                //Creates a duplicate window at link above
                window.open(url,'www.test.com').focus();
        }

        return (
            <div className={"graphview"} >
                    <Graph
                        id={'graph-id'} // id is mandatory, if no id is defined rd3g will throw an error
                        data={theData}
                        config={myConfig}
                        onClickNode={onClickNode.bind(this)}
                        onClick={childFunction.bind(this)}
                        onDoubleClickNode={onDoubleClickNode}
                        onRightClickNode={onRightClickNode}
                        onMouseOverNode={onMouseOverNode}
                        onMouseOut={onMouseOutNode}
                        onClickLink={onClickLink}
                        onRightClickLink={onRightClickLink}
                        onMouseOverLink={onMouseOverLink}
                        onMouseOutLink={onMouseOutLink}
                        onClickGraph={onClickGraph}
                        onZoomChange={onZoomChange}
                    />
                    <QueryList val={val} setVal={setVal} nodeI={nodeInfo}/>
            </div>
        );
}

export default GraphView;