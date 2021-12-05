import React, {Component} from 'react';
import "./GraphView.css"
import {NodeContext, NodeProvider} from "./NodeContext.js";
import myData from '../Data/scratch.json'
import {BrowserRouter as Router} from "react-router-dom";
import Navbar from "./Navbar";
import GraphView from "./GraphView";

import Chart from "./Chart"

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
            <div >
            <NodeProvider>
                <Router>
                    <Navbar valueFromParent={this.state.value_key} functionCallFromParent={this.parentFunction.bind(this)}/>
                    <GraphView data={myData} functionCallFromParent={this.parentFunction.bind(this)} valueFromParent={this.state.value_key}/>
                    <Chart type={"revenue"} />
                    <Chart type={"metascore"} />
                    <Chart type={"rating"} />
                </Router>
            </NodeProvider>
            </div>
        );
    }
}

export default Parent;