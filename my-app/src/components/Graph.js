import React, { useState } from 'react';
import { Button } from "./Button"
import "./Navbar.css"
import {Component} from "react/cjs/react.production.min";

class Graph extends Component {
    componentDidMount(){
        this.drawChart();
    }

    drawChart(){

    }

    render(){
        return <div id={"#" + this.props.id}>

        </div>
    }
}

export default Graph;