import React, { Component, useContext }  from "react";
import Navbar from "./components/Navbar"
import GraphView from "./components/GraphView";
import './App.css';
import {NodeProvider} from "./components/NodeContext";
import { BrowserRouter as Router } from "react-router-dom"
//import myData from './Data/scratch.json'
import { Graph } from "react-d3-graph";
import myData from './Data/nodesInfo2.json'

/**
 * Author: Dillon Gorlesky
 * Date: 5/10/2021
 * This is the main class of the program where all the classes made are rendered for the GUI
 */
class App extends Component {
    /**
     * The purpose of this function is to set global data that was used to test
     * the data sharing capabilities of the providers.
     * @param props: Information passed between classes
     */
    constructor(props) {
        super(props);
        this.state = {
            data: myData,
            svgRef: React.forwardRef
        };
    }
    //This is where the Provider classes allow all the classes to share information
    render() {
        return (
            <NodeProvider>
                <Router>
                    <Navbar />
                    <GraphView />
                </Router>
            </NodeProvider>
        );
    }
}
export default App;

