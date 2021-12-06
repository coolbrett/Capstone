import React, {Component} from 'react';
import "./GraphView.css"
import {NodeProvider} from "./NodeContext.js";
import myData from '../Data/scratch.json'
import {BrowserRouter as Router} from "react-router-dom";
import Navbar from "./Navbar";
import GraphView from "./GraphView";
import Chart from "./Chart"

/**
 * This class calls the classes to fill up the GUI and share data between them
 * @Author: Dillon Gorlesky
 * @Author Brett Dale
 * @Date: 12/05/2021
 */
class Parent extends Component{
    constructor(props){
        super(props);
        this.state={
            value_key:""
        }
    }

    /**
     * New data to share between them
     * @param data_from_child new data to pass to classes
     */
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