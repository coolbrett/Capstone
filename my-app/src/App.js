import React, { Component }  from "react";
import Navbar from "./components/Navbar"
import GraphView from "./components/GraphView";
import './App.css';
import { BrowserRouter as Router } from "react-router-dom"
import myData from './Data/scratch.json'
import { Graph } from "react-d3-graph";
//import myData from './Data/nodesInfo2.json'

class App extends Component {
    render() {
        return (
            <Router>
                <Navbar />
                <GraphView />
            </Router>
        );
    }
}
export default App;

