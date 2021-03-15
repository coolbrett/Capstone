let fs = require('fs');
let temp = fs.readFileSync('Data/nodes.json');
let data = JSON.parse(temp);
let d3 = require('d3');

//create somewhere to put the force directed graph
let svg = d3.select("svg"),
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
simulation.on("tick", tickActions );


//Time for the links

//Create links data
const links_data = data['links'];



//Create the link force
//We need the id accessor to use named sources and targets

let link_force =  d3.forceLink(links_data)
    .id(function(d) { return d.name; })

//Add a links force to the simulation
//Specify links  in d3.forceLink argument


simulation.force("links",link_force)

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
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

    //update link positions
    //simply tells one end of the line to follow one node around
    //and the other end of the line to follow the other node around
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

}
