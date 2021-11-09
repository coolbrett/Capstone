import React, {useContext, useState} from "react";
import Chart from "./Chart";
import limit from "./limit.json";
import {NodeContext} from "./NodeContext";

const data = [
    {category:'A', quantity: 40},
    {category:'B', quantity: 151},
    {category:'C', quantity: 89},
    {category:'D', quantity: 124}
]

const Popup = (props) => {

    let context = useContext(NodeContext);
    let [chartData, setChartData] = context;

    const swap = () => {
        console.log("PopUp");
        //console.log(limit)
        setChartData([{category: "Split", quantity: 1}]);

    }

    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={props.handleClose}>x</span>
                {props.content}
                <a> &nbsp; </a>
                <button onClick={swap} className={"button"}>Swap Charts</button>
            </div>
            <Chart data2={chartData}/>
        </div>
    );
};

export default Popup;