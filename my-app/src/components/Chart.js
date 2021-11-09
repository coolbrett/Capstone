import React, { useEffect, useRef, useState, useContext } from 'react';
import * as d3 from 'd3';
import "./ResponsiveBar.css"
import {NodeContext} from "./NodeContext";
//import someData2 from '../Data/limit.json'
import limit from "./limit.json"


const sample = [
    {category:'A', quantity: 40},
    {category:'B', quantity: 151},
    {category:'C', quantity: 89},
    {category:'D', quantity: 124}
]

const Chart = (props) => {
    let context = useContext(NodeContext);
    let [theData, setTheData] = context;
    let [chartData, setChartData] = context;

    //console.log(limit)
    let movies = [];
    for (let i = 0; i < limit.length; i++){
        movies.push(limit[i].nodes[0]);
    }
    console.log("Movies from query")
    console.log(movies)

    let revenue = movies.sort(function (a, b){
        return a.revenue - b.revenue;
    });
    console.log("Movies sorted by revenue")
    console.log(revenue);

    let metascore = movies.sort(function (a, b){
        return a.metascore - b.metascore;
    });
    console.log("Movies sorted by metascore")
    console.log(metascore);

    let rating = movies.sort(function (a, b){
        return a.rating - b.rating;
    });
    console.log("Movies sorted by rating")
    console.log(rating);

    const dataToChart = (obj) => {
        let arr = []
        for (let i = 0; i < obj.length; i++){
            let temp = {category: obj[i].name, quantity: obj[i].revenue};
            arr.push(temp);
        }
        arr.sort(function (a, b){
            return a.quantity - b.quantity;
        });
        return arr;
    }

    let temp = dataToChart(revenue);
    console.log(temp);


    const d3Chart = useRef()
    // Ref for updating dimention
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })
    // Ref for resize event update
    const update = useRef(false)

    useEffect(()=>{

        // Listen for any resize event update
        window.addEventListener('resize', ()=>{
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            })

            // If resize, remove the previous chart
            if(update.current){
                d3.selectAll('g').remove()
            } else {update.current = true}
        })
        /**let values = ['category', 'quantities']
        let data = [];
        let test = JSON.parse(someData2);
        for(let i = 0; i < 6; i++){
            let obj = {};
            obj[values[i]] = test[i].nodes.id
            data.push(obj);
        }*/

        // Draw chart using the data and updated dimensions

        console.log("here " + chartData);
        DrawChart(temp, dimensions)

    },[dimensions])

    const margin = {top: 50, right:30, bottom: 30, left:60}


    function DrawChart(data, dimensions){

        // console.log(dimensions.width, dimensions.height)

        const chartwidth = parseInt(d3.select('#d3demo').style('width')) - margin.left - margin.right
        const chartheight = parseInt(d3.select('#d3demo').style('height')) - margin.top - margin.bottom


        const svg = d3.select(d3Chart.current)
            .attr('width', chartwidth + margin.left + margin.right)
            .attr('height', chartheight + margin.top + margin.bottom)

        //X axis
        svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "start")
            .attr("x", chartwidth /2)
            .attr("y", chartheight + 50)
            .text("Movie Titles");

        //Y-axis
        svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "middle")
            .attr("y", 6)
            .attr("x", -200)
            //.attr("x", -100)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text("Revenue (Millions)");

        // x scale
        const x = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([margin.left, chartwidth - margin.right])
            .padding(0.1)

        svg.append('g')
            .attr('transform', 'translate(0,'+ chartheight + ')')
            .call(d3.axisBottom(x).tickFormat(i=>data[i].category).tickSizeOuter(0))

        const max = d3.max(data, function(d){return d.quantity})

        // y scale
        const y = d3.scaleLinear()
            .domain([0, max])
            .range([chartheight, margin.top])
            .range([chartheight, margin.top])

        svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',0)')
            .call(d3.axisLeft(y))

        // Draw bars
        svg.append('g')
            .attr('fill','#592C8B')
            .selectAll('rect')
            .data(data)
            .join('rect')
            .attr('x', (d,i) => x(i))
            .attr('y', d => y(d.quantity))
            .attr('height', d=>y(0)-y(d.quantity))
            .attr('width', x.bandwidth())

    }

    return (
        <div id='d3demo'>
            <svg ref={d3Chart}/>
        </div>
    )
}

export default Chart