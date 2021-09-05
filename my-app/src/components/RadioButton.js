import React, { useState } from 'react';
import './RadioButton.css';
import { Link } from 'react-router-dom';

/**
 * Author: Dillon Gorlesky, Brett Dale
 * Date: 5/10/2021
 * The purpose of this class is to create a RadioButton that can be rendered
 * in the App (main) class of the project and displayed in the Navbar
 */
export function RadioButton() {
    //Sets the state
    const [radio, setRadio] = useState("apple");

    return (
        <form>
            <h1 className={"radio-butt"}>{radio}</h1>

            <label className={"radio"}>Banana : </label>
            <input type={"radio"}
                   checked={radio === "Banana"}
                   value={"Banana"}
                   onChange={(e)=>{ setRadio(e.target.value)}}
            />

        </form>
    );
}