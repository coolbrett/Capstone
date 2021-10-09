import React, { Component, useContext }  from "react";
import './App.css';
//import myData from './Data/scratch.json'
//import myData from './Data/nodesInfo2.json'
import myData from './Data/scratch.json'
import Parent from "./components/Parent";
//import myData from './Data/test.json'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodeClicked: "val",
            svgRef: React.forwardRef
        };
    }

    render() {
        return (
            <Parent />
    );
    }
}

/**
 * <Navbar />
 */

export default App;

