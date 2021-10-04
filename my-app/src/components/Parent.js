import React, {useRef, Component, useContext, useState} from 'react';
import "./graph.const"
import "./GraphView.css"
import {NodeContext, NodeProvider} from "./NodeContext.js";
import myData from '../Data/scratch.json'
import {BrowserRouter as Router} from "react-router-dom";
import Navbar from "./Navbar";
import GraphView from "./GraphView";
//import myData from '../Data/test.json'
//import myData from '../Data/nodesInfo2.json'

class Parent extends Component{
    constructor(props){
        super(props);
        this.state={
            value_key:""
        }
    }
    parentFunction=(data_from_child)=>{
        this.setState({value_key:data_from_child});
    }

    render() {
        return (
            <NodeProvider>
                <Router>
                    <Navbar nodeClicked={"hello"} valueFromParent={this.state.value_key}/>
                    <GraphView data={myData} functionCallFromParent={this.parentFunction.bind(this)}/>
                </Router>
            </NodeProvider>
        );
    }
}

export default Parent;