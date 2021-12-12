import React, {useContext, useState} from 'react';
import Graph from '../react-d3-graph/src/components/graph/Graph'
import "./GraphView.css"
import QueryList from "./QueryList"
import { NodeContext } from "./NodeContext.js";

import myData from '../Data/scratch.json'

/**
 * This is the class responsible for creating the Graph View of compiled nodes
 * @Author: Dillon Gorlesky
 * @Author Brett Dale
 * @Date: 12/05/2021
 */
let last = "";
const GraphView = (props) => {
        const[nodeInfo, setNodeInfo] = useState("");
        const[val, setVal] = useState(0);


        let last2 = props.valueFromParent
        let context = useContext(NodeContext);
        let [theData, setTheData] = context;

        if(theData.length === 1){
                setTheData(myData);
        }

        /**
         * Setting the new data
         * @param dataHere
         */
        const setData = function(dataHere){
                setTheData(dataHere);
        }

        /**
         * Configuration of the graph
         * @type {{node: {strokeWidth: number, highlightStrokeColor: string, color: string, size: number, fontSize: number}, nodeHighlightBehavior: boolean, maxZoom: number, highlightDegree: number, width: number, link: {highlightColor: string}, minZoom: number, height: number}}
         */
        const myConfig = {
                nodeHighlightBehavior: true,
                //height: 800,
                //width: 1500,
                height: 500,
                width: 800,
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


        /**
         * Whenever a node is clicked it will change the color and set it to navbar
         * to be displayed better
         * @param nodeID
         */
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
                        } else {
                                //Setting the previous node to be empty
                                //For whatever reason it only works if I do this
                                item.color = "red"
                                last = "";
                        }
                });
                props.functionCallFromParent(last);
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

        /**
         * Handles whenever the graph is clicked
         * @param event
         */
        const onClickGraph = function(event) {
                console.log('Clicked the graph background');
        };

        /**
         * Handles whenever a node is double clicked
         * @param nodeId
         * @param node
         */
        const onDoubleClickNode = function(nodeId, node) {
                console.log('Double clicked node ${nodeId} in position (${node.x}, ${node.y})');
        };

        /**
         * Handles when a node is right clicked
         * @param event
         * @param nodeId
         * @param node
         */
        const onRightClickNode = function(event, nodeId, node) {
              console.log('Right clicked node ${nodeId} in position (${node.x}, ${node.y})');
        };

        /**
         * Whenever a node is hovered over it compiles its data to be displayed in a formatted
         * manner
         * @param nodeId
         * @param node
         */
        const onMouseOverNode = function(nodeId, node) {
              console.log(node);
              let s = `Name: ` + node.id
                s += "\nLabel: " + node.label
                if(node.label === "Movie") {
                        s += "\nDirector: " + node.director
                        s += "\nGenres: " + node.genres
                        s += "\nActors: " + node.actors
                        s += "\nMetascore: " + node.metascore + "/100"
                        s += "\nRevenue: " + node.revenue + "M"
                        s += "\nRuntime: " + node.runtime + " min"
                        s += "\nRating: " + node.rating + "/10"
                }
              setNodeInfo(s)
        };

        /**
         * Hnaldes when a mouse is moved off a node
         * @param nodeId
         * @param node
         */
        const onMouseOutNode = function(nodeId, node) {
                console.log(`Mouse out node ${nodeId} in position (${node.x}, ${node.y})`);
        };

        /**
         * Handles when a link is clicked
         * @param source
         * @param target
         */
        const onClickLink = function(source, target) {
              console.log(`Clicked link between ${source} and ${target}`);
        };

        /**
         * Handles when a link is right clicked
         * @param source
         * @param target
         */
        const onRightClickLink = function(event, source, target) {
              console.log('Right clicked link between ${source} and ${target}');
         };

        /**
         * Handles when a link is hovered over
         * @param source
         * @param target
         */
        const onMouseOverLink = function(source, target) {
              console.log(`Mouse over in link between ${source} and ${target}`);
         };

        /**
         * Handles when a link moved off of
         * @param source
         * @param target
         */
        const onMouseOutLink = function(source, target) {
              console.log(`Mouse out link between ${source} and ${target}`);
         };


        /**
         * This created a second webpage to show graphs
         * @param e
         */
        const childFunction = (e) =>{
                e.preventDefault();
                this.props.functionCallFromParent(last);
                //http://localhost:3000/www.test.com
                //Creates a duplicate window at link above
                //window.open(url,'www.test.com').focus();
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