import React, { Component, useContext }  from "react";
import './App.css';
//import myData from './Data/scratch.json'
//import myData from './Data/nodesInfo2.json'
import myData from './Data/scratch.json'
import Parent from "./components/Parent";
//import myData from './Data/test.json'

/**
 * This is the main class of the program that properly creates the GUI
 * @Author: Dillon Gorlesky
 * @Author Brett Dale
 * @Date: 12/05/2021
 */
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

