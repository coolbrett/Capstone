import React, {useRef, Component, useContext, useState} from 'react';
import { Graph } from 'react-d3-graph'
import "./graph.const"
import "./GraphView.css"
import QueryList from "./QueryList"
import { NodeContext } from "./NodeContext.js";

import DEFAULT_CONFIG from "./graph.config"
import {useEffect} from "react/cjs/react.production.min";
import myData from '../Data/scratch.json'
import * as url from "url";
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
                //height: 800,
                //width: 1400,
                height: 500,
                width: 700,
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
                let selectNode = modData.nodes.filter(item => {
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
                setData(modData);
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
                    />
                    <QueryList />
            </div>
        );
}

function getLast(setPrevId){
        setPrevId(last)
}
export default GraphView;