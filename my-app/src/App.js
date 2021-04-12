import React, { useRef, useEffect }  from 'react';
import Navbar from "./components/Navbar"
import './App.css';
import * as d3 from 'd3';
import { Fetch } from 'react-request';
import { BrowserRouter as Router } from 'react-router-dom'
import * as XLSX from 'xlsx';
import DataTable from 'react-data-table-component';
import { csv } from 'd3';


function App() {
    const height = 500;
    const width = 500;
    const nodes = new Request('Data/nodesInfo.json');
    const svgRef = useRef();
    useEffect(() => {
        fetch(nodes).then(response => response.json()).then(data => {
        //loops below just display contents of our nodesInfo.json file in the browser's console
        //it takes FOREVER to log these
        /** for (const obj of data['nodes']){
            console.log("Name: " + obj['name']);
        }

         for (const obj of data['links']){
            console.log("source: " + obj['source']);
            console.log("target: " + obj['target']);
        }*/

         //create somewhere to put the force directed graph
         let svg = d3.select(svgRef.current),
         width = +svg.attr("width"),
         height = +svg.attr("height");


         const nodes_data = data['nodes'];


         //set up the simulation
         //nodes only for now
         let simulation = d3.forceSimulation()
         //add nodes
         .nodes(nodes_data);

         //add forces
         //we're going to add a charge to each node
         //also going to add a centering force
         simulation
         .force("charge_force", d3.forceManyBody())
         .force("center_force", d3.forceCenter(width / 2, height / 2));


         //draw circles for the nodes
         let node = svg.append("g")
         .attr("class", "nodes")
         .selectAll("circle")
         .data(nodes_data)
         .enter()
         .append("circle")
         .attr("r", 5)
         .attr("fill", "red");


         //add tick instructions:
         simulation.on("tick", tickActions);


         //Time for the links

         //Create links data
         const links_data = data['links'];

         //Create the link force
         //We need the id accessor to use named sources and targets

         let link_force = d3.forceLink(links_data)
         .id(function (d) {
             return d.name;
         })

         //Add a links force to the simulation
         //Specify links  in d3.forceLink argument


         simulation.force("links", link_force)

         //draw lines for the links
         let link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(links_data)
            .enter().append("line")
            .attr("stroke-width", 2);


         function tickActions() {
                    //update circle positions each tick of the simulation
                    node
                        .attr("cx", function (d) {
                            return d.x;
                        })
                        .attr("cy", function (d) {
                            return d.y;
                        });

                    //update link positions
                    //simply tells one end of the line to follow one node around
                    //and the other end of the line to follow the other node around
                    link
                        .attr("x1", function (d) {
                            return d.source.x;
                        })
                        .attr("y1", function (d) {
                            return d.source.y;
                        })
                        .attr("x2", function (d) {
                            return d.target.x;
                        })
                        .attr("y2", function (d) {
                            return d.target.y;
                        });

                }
            });
         }, [nodes])


    return (
            <Router>
                <Navbar/>
                <React.Fragment>
                    <svg
                        width="960" height="1000"
                        ref={svgRef}
                        viewBox={`0 0 ${height} ${width}`}
                        style={{
                            height: "100%",
                            width: "100%",
                            marginRight: "0px",
                            marginLeft: "0px",
                        }}>
                    </svg>
                </React.Fragment>
            </Router>
        );
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
