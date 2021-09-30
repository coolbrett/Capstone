import React, { Component, useContext }  from "react";
import Navbar from "./components/Navbar"
import GraphView from "./components/GraphView";
import QueryButton from "./components/QueryButton";
import './App.css';
import {NodeProvider} from "./components/NodeContext";
import { BrowserRouter as Router } from "react-router-dom"
import myData from './Data/scratch.json'
import { Graph } from "react-d3-graph";
import QueryList from "./components/QueryList";
//import myData from './Data/nodesInfo2.json'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: myData,
            svgRef: React.forwardRef
        };
    }
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

//Got rid of <Querylist /> underneath graph view
export default App;

