import React, { useState } from 'react';
import './RadioButton.css';
import { Link } from 'react-router-dom';

export function RadioButton() {
    const [radio, setRadio] = useState("apple");

    return (
        <form>
            <h1 className={"radio-butt"}>{radio}</h1>

            <label className={"radio"}>Apple : </label>
            <input type={"radio"}
                   checked={radio === "Apple"}
                   value={"Apple"}
                   onChange={(e)=>{ setRadio(e.target.value)}}
            />
            <br/>
            <label className={"radio"}>Orange : </label>
            <input type={"radio"}
                   checked={radio === "Orange"}
                   value={"Orange"}
                   onChange={(e)=>{ setRadio(e.target.value)}}
            />
            <br/>
            <label className={"radio"}>Banana : </label>
            <input type={"radio"}
                   checked={radio === "Banana"}
                   value={"Banana"}
                   onChange={(e)=>{ setRadio(e.target.value)}}
            />

        </form>
    );
}