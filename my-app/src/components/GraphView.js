import React, { useRef, Component } from 'react';
import { Graph } from 'react-d3-graph'
import "./graph.const"
import "./GraphView.css"
import DEFAULT_CONFIG from "./graph.config"
//import myData from '../Data/scratch.json'
import myData from '../Data/nodesInfo2.json'

const GraphView = () => {


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

        const reactRef = this;
        //const check = this.state.prevId;
        let inside = "";
        let clicked = "-";
        const onClickNode = function(nodeId) {
                let modData = {...reactRef.state.data};
                let selectNode = modData.nodes.filter(item => {
                        return item.id === nodeId;
                });
                selectNode.forEach(item => {
                        if (item.color && item.color === "blue") item.color = "red";
                        else item.color = "blue";
                        /**clicked = item.id;
                        if(item.id !== check){
                                inside = item.id;
                                //Setting the color of the node clicked to opposite color
                                if (item.color && item.color === "blue") item.color = "red";
                                else item.color = "blue";

                                let selectPrev = modData.nodes.filter(item => {
                                        return item.id === check;
                                });
                                //This sees if the node clicked is the previous node clicked
                                //In order to change last node clicked back to red
                                selectPrev.forEach(items => {
                                        if(items.id === check){
                                                if (items.color && items.color === "blue") items.color = "red";
                                                else items.color = "blue";
                                        }
                                });
                        } else {
                                if (item.color && item.color === "red") item.color = "blue";
                                else item.color = "red";
                                inside = "-";
                        }*/
                });
        };

        return (
            <div className={"graphview"} >
            <Graph
                id={'graph-id'} // id is mandatory, if no id is defined rd3g will throw an error
                data={myData}
                config={myConfig}
            />
            </div>
        );
}
export default GraphView;