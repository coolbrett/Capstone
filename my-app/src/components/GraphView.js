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
import axios from "axios";
//import myData from '../Data/test.json'
//import myData from '../Data/nodesInfo2.json'

let last = "";
const GraphView = (props) => {
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
                width: 1400,
                //height: 500,
               // width: 700,
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
              console.log(`Mouse over node ${nodeId} in position (${node.x}, ${node.y})`);
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
                        onClickLink{onClickLink}
                        onRightClickLink={onRightClickLink}
                        onMouseOverLink{onMouseOverLink}
                        onMouseOutLink={onMouseOutLink}
                        onClickGraph={onClickGraph}
                    />
                    <QueryList />
            </div>
        );
}

export default GraphView;