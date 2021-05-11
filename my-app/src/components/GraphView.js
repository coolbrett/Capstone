import React, {useRef, Component, useContext, useState} from 'react';
import { Graph } from 'react-d3-graph'
import "./graph.const"
import "./GraphView.css"
import { NodeContext } from "./NodeContext.js";

import DEFAULT_CONFIG from "./graph.config"
import myData from '../Data/scratch.json'
//import myData from '../Data/nodesInfo2.json'
let id = "Chris Pratt"

/**
 * Author: Dillon Gorlesky, Brett Dale
 * Date: 05/10/2021
 * The purpose of this class is to handle the GraphView and have it in a separate class
 * other than App like we had in the second to last progress report. This also allows
 * use to implement searching and node interaction easier.
 */
const GraphView = (e) => {
        //Setting the data to be modified
        let data = myData;
        //Allows us to use the functions from NodeContext
        let context = useContext(NodeContext);
        //This is setting the previously clicked node to be stored elsewhere so Navbar can see it
        let [nodeId, setClickedNode] = context;
        //This is setting the previously clicked node to be stored elsewhere
        let [prevId, setPrevId] = context;

        //Modifying the data
        //Param dataHere: The new modified data we're setting
        const setData = function(dataHere){
                data = dataHere;
        }

        /**
         * The purpose of this function was used to test setting the
         * color of a node to blue or red
         * @param clickedNode: Node object clicked
         * @returns {number}: Number based on what color the node should be changed to
         */
        const getColor = function(clickedNode){
                if(clickedNode.color === "blue"){
                        return 0;
                }
                return 1;
        }

        /**
         * These are the configurations being set for the graph when loaded
         */
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


        /**
         * Author: Dillon Gorlesky, Brett Dale
         * Date: 05/10/2021
         * The purpose of this function is to allow the other classes to set nodes
         * when clicked/searched
         * @param nodeId: The name of the node clicked
         */
        const onClickNode = function(nodeID) {
                let modData = {...myData};
                //Filtering through the data to find the node clicked
                let selectNode = modData.nodes.filter(item => {
                        return item.id === nodeID;
                });
                selectNode.forEach(item => {
                        //Setting color if node hasn't been clicked
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

        //Defining the Graph being displayed in App (main) class
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