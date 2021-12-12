import React, { useEffect, useRef, useState, useContext } from 'react';
import * as d3 from 'd3';
import "./ResponsiveBar.css"
import {NodeContext} from "./NodeContext";
import limit from "./limit.json"

/**
 * This is the class making the charts on the GUI
 * @Author: Dillon Gorlesky
 * @Author Brett Dale
 * @Date: 12/05/2021
 */
const Chart = (props) => {

    let context = useContext(NodeContext);
    let [theData, setTheData] = context;
    let [chartData, setChartData] = context;

    let movies = [];
    for (let i = 0; i < limit.length; i++){
        movies.push(limit[i].nodes[0]);
    }

    const dataToChart = (obj) => {
        let arr = []
        for (let i = 0; i < obj.length; i++){
            let type = props.type;
            let temp = {category: obj[i].name, quantity: obj[i][type]};
            arr.push(temp);
        }
        arr.sort(function (a, b){
            return a.quantity - b.quantity;
        });
        //chart gets messy past 10
        return arr.slice(-10);
    }


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

        // Draw chart using the data and updated dimensions
        if (props.type === "revenue"){
            let revenue = movies.sort(function (a, b){
                return a.revenue - b.revenue;
            });
            DrawChart(dataToChart(revenue), dimensions);
        }
        else if (props.type === "metascore"){
            let metascore = movies.sort(function (a, b){
                return a.metascore - b.metascore;
            });
            DrawChart(dataToChart(metascore), dimensions);
        }
        else if (props.type === "rating"){
            let rating = movies.sort(function (a, b){
                return a.rating - b.rating;
            });
            DrawChart(dataToChart(rating), dimensions);
        }
        //DrawChart(temp, dimensions)

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
            .text(props.type.toUpperCase());

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