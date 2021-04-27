import React, { useRef, Component }  from "react";
import { Graph } from "react-d3-graph";
import Navbar from "./components/Navbar"
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
//import myData from './Data/scratch.json'
import myData from './Data/nodesInfo2.json'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: myData,
            svgRef: React.createRef(),
            color: "red",
            prevId: "-",
            nodeClicked: "_____"
        };
    }

    render() {
        // the graph configuration, you only need to pass down properties
        // that you want to override, otherwise default ones will be used
        const myConfig = {
            nodeHighlightBehavior: true,
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
        const check = this.state.prevId;
        let inside = "";
        let clicked = "-";
        const onClickNode = function(nodeId) {
            let modData = {...reactRef.state.data};
            let selectNode = modData.nodes.filter(item => {
                return item.id === nodeId;
            });
            selectNode.forEach(item => {
                clicked = item.id;
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
                }
            });
            reactRef.setState({nodeClicked: clicked})
            reactRef.setState({data: modData});
            reactRef.setState({prevId: inside});
        };

        return (
            <Router>
                <Navbar clickedNode={this.state.nodeClicked}/>
                <Graph
                    id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                    data={this.state.data}
                    config={myConfig}
                    onClickNode={onClickNode}
                />
            </Router>
        );
    }
}
export default App;

//*
//function App() {
  //return(
    //  <Router>
  //      <Navbar />
//      </Router>

 // );
//}

//export default App;
