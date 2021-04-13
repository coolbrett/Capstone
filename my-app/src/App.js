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
    //const nodes = new Request('Data/nodesInfo.json');
    const nodes = new Request('Data/scratch.json');

    const svgRef = useRef();
    useEffect(() => {
        fetch(nodes).then(response => response.json()).then(data => {
        //loops below just display contents of our nodesInfo.json file in the browser's console
        //it takes FOREVER to log these


         //create somewhere to put the force directed graph
         let svg = d3.select(svgRef.current)
             .append("svg")
             .attr("preserveAspectRatio", "xMinYMin meet")
             .attr("viewBox", "0 0 300 300")
             //.attr("viewBox", "0 0 9000 9000")
             .classed("svg-content", true);


            const nodes_data = data['nodes'];

            //Create links data
            const links_data = data['links'];


            let simulation = d3.forceSimulation()
               .nodes(nodes_data);
/**
            console.log(links_data[0]);
            console.log(links_data[0].id);
            console.log(links_data[0].index);
            console.log(links_data[0].name);
            console.log(links_data[0].x);
            console.log(links_data[0].y);

            console.log("-------");*/



            let link_force = d3.forceLink(links_data)
                .id(function (d) {
                    return d.name;
                })

            simulation
                .force("charge_force", d3.forceManyBody())
                .force("center_force", d3.forceCenter(width / 2, height / 2));



            let link = svg.append("g")
                .attr("class", "links")
                .selectAll("line")
                .data(links_data)
                .enter().append("line")
                .attr("style", "stroke: #000000; stroke-opacity: 0.7;")
                .attr("stroke-width", 2);


        for(let i = 0; i < nodes_data.length; i++) {
            let text = svg.append("g")
                .attr("class", "links")
                .selectAll("text")
                .data(nodes_data)
                .enter()
                .append("text")
                .attr("dx", 100)
                .attr("dy", 100)
                .text(function (d) {
                    return d.name
                });
        }

         //draw circles for the nodes
            let node = svg.append("g")
                .attr("class", "nodes")
                .selectAll("circle")
                .data(nodes_data)
                .enter()
                .append("circle")
                .attr("r", 5)
                .attr("fill", "red");


            node.append("text")
                node.text(function (d) { return d.name });



         //add tick instructions:
         simulation.on("tick", tickActions);


         //Time for the links

         //Add a links force to the simulation
         //Specify links  in d3.forceLink argument



         simulation.force("links", link_force)


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

        //.attr("viewBox", "0 0 300 300")
    //.attr("viewBox", "0 0 9000 9000")
    return (
            <Router>
                <Navbar/>
                <React.Fragment>
                    <svg
                        width="100%" height="70%"
                        ref={svgRef}
                        viewBox={ "0 0 300 139"}
                        >
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
