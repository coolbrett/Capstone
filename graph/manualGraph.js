/**
 * This graph is our movie data but manually entered
 */

//create somewhere to put the force directed graph
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");


var nodes_data =  [
    {
        "name": "Guardians of the Galaxy",
        "id": "1"
    },
    {
        "name": "Chris Pratt"
    },
    {
        "name": "Vin Diesel"
    },
    {
        "name": "Bradley Cooper"
    },
    {
        "name": "Zoe Saldana"
    },
    {
        "name": "Prometheus",
        "id": "2"
    },
    {
        "name": "Noomi Rapace"
    },
    {
        "name": "Logan Marshall-Green"
    },
    {
        "name": "Michael Fassbender"
    },
    {
        "name": "Charlize Theron"
    },
    {
        "name": "Split",
        "id": "3"
    },
    {
        "name": "James McAvoy"
    },
    {
        "name": "Anya Taylor-Joy"
    },
    {
        "name": "Haley Lu Richardson"
    },
    {
        "name": "Jessica Sula"
    },
    {
        "name": "Sing",
        "id": "4"
    },
    {
        "name": "Matthew McConaughey"
    },
    {
        "name": "Reese Witherspoon"
    },
    {
        "name": "Seth MacFarlane"
    },
    {
        "name": "Scarlett Johansson"
    },
    {
        "name": "Suicide Squad",
        "id": "5"
    },
    {
        "name": "Will Smith"
    },
    {
        "name": "Jared Leto"
    },
    {
        "name": "Margot Robbie"
    },
    {
        "name": "Viola Davis"
    },
    {
        "name": "The Great Wall",
        "id": "6"
    },
    {
        "name": "Matt Damon"
    },
    {
        "name": "Tian Jing"
    },
    {
        "name": "Willem Dafoe"
    },
    {
        "name": "Andy Lau"
    },
    {
        "name": "La La Land",
        "id": "7"
    },
    {
        "name": "Ryan Gosling"
    },
    {
        "name": "Emma Stone"
    },
    {
        "name": "Rosemarie DeWitt"
    },
    {
        "name": "J.K. Simmons"
    },
    {
        "name": "Mindhorn",
        "id": "8"
    },
    {
        "name": "Essie Davis"
    },
    {
        "name": "Andrea Riseborough"
    },
    {
        "name": "Julian Barratt"
    },
    {
        "name": "Kenneth Branagh"
    },
    {
        "name": "The Lost City of Z",
        "id": "9"
    },
    {
        "name": "Charlie Hunnam"
    },
    {
        "name": "Robert Pattinson"
    },
    {
        "name": "Sienna Miller"
    },
    {
        "name": "Tom Holland"
    },
    {
        "name": "Passengers",
        "id": "10"
    },
    {
        "name": "Jennifer Lawrence"
    },
    {
        "name": "Chris Pratt"
    },
    {
        "name": "Michael Sheen"
    },
    {
        "name": "Laurence Fishburne"
    }
]



//set up the simulation
//nodes only for now
var simulation = d3.forceSimulation()
    //add nodes
    .nodes(nodes_data);

//add forces
//we're going to add a charge to each node
//also going to add a centering force
simulation
    .force("charge_force", d3.forceManyBody())
    .force("center_force", d3.forceCenter(width / 2, height / 2));


//draw circles for the nodes
var node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(nodes_data)
    .enter()
    .append("circle")
    .attr("r", 6)
    .attr("fill", "red");

node.append("title")
    .text(d => d.id);



//add tick instructions:
simulation.on("tick", tickActions );


//Time for the links

//Create links data
var links_data = [
    {
        "source": "Guardians of the Galaxy",
        "target": "Chris Pratt"
    },
    {
        "source": "Guardians of the Galaxy",
        "target": "Vin Diesel"
    },
    {
        "source": "Guardians of the Galaxy",
        "target": "Bradley Cooper"
    },
    {
        "source": "Guardians of the Galaxy",
        "target": "Zoe Saldana"
    },
    {
        "source": "Prometheus",
        "target": "Noomi Rapace"
    },
    {
        "source": "Prometheus",
        "target": "Logan Marshall-Green"
    },
    {
        "source": "Prometheus",
        "target": "Michael Fassbender"
    },
    {
        "source": "Prometheus",
        "target": "Charlize Theron"
    },
    {
        "source": "Split",
        "target": "James McAvoy"
    },
    {
        "source": "Split",
        "target": "Anya Taylor-Joy"
    },
    {
        "source": "Split",
        "target": "Haley Lu Richardson"
    },
    {
        "source": "Split",
        "target": "Jessica Sula"
    },
    {
        "source": "Sing",
        "target": "Matthew McConaughey"
    },
    {
        "source": "Sing",
        "target": "Reese Witherspoon"
    },
    {
        "source": "Sing",
        "target": "Seth MacFarlane"
    },
    {
        "source": "Sing",
        "target": "Scarlett Johansson"
    },
    {
        "source": "Suicide Squad",
        "target": "Will Smith"
    },
    {
        "source": "Suicide Squad",
        "target": "Jared Leto"
    },
    {
        "source": "Suicide Squad",
        "target": "Margot Robbie"
    },
    {
        "source": "Suicide Squad",
        "target": "Viola Davis"
    },
    {
        "source": "The Great Wall",
        "target": "Matt Damon"
    },
    {
        "source": "The Great Wall",
        "target": "Tian Jing"
    },
    {
        "source": "The Great Wall",
        "target": "Willem Dafoe"
    },
    {
        "source": "The Great Wall",
        "target": "Andy Lau"
    },
    {
        "source": "La La Land",
        "target": "Ryan Gosling"
    },
    {
        "source": "La La Land",
        "target": "Emma Stone"
    },
    {
        "source": "La La Land",
        "target": "Rosemarie DeWitt"
    },
    {
        "source": "La La Land",
        "target": "J.K. Simmons"
    },
    {
        "source": "Mindhorn",
        "target": "Essie Davis"
    },
    {
        "source": "Mindhorn",
        "target": "Andrea Riseborough"
    },
    {
        "source": "Mindhorn",
        "target": "Julian Barratt"
    },
    {
        "source": "Mindhorn",
        "target": "Kenneth Branagh"
    },
    {
        "source": "The Lost City of Z",
        "target": "Charlie Hunnam"
    },
    {
        "source": "The Lost City of Z",
        "target": "Robert Pattinson"
    },
    {
        "source": "The Lost City of Z",
        "target": "Sienna Miller"
    },
    {
        "source": "The Lost City of Z",
        "target": "Tom Holland"
    },
    {
        "source": "Passengers",
        "target": "Jennifer Lawrence"
    },
    {
        "source": "Passengers",
        "target": "Chris Pratt"
    },
    {
        "source": "Passengers",
        "target": "Michael Sheen"
    },
    {
        "source": "Passengers",
        "target": "Laurence Fishburne"
    }
]



//Create the link force
//We need the id accessor to use named sources and targets

var link_force =  d3.forceLink(links_data)
    .id(function(d) { return d.name; })

//Add a links force to the simulation
//Specify links  in d3.forceLink argument


simulation.force("links",link_force)

//draw lines for the links
var link = svg.append("g")
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
