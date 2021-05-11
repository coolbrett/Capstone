import React, { useState, useContext } from 'react';
import { Button } from "./Button"
import "./Navbar.css"
import { Link } from 'react-router-dom'
import {RadioButton} from "./RadioButton";
import { NodeContext }from "./NodeContext";
import FindNode from "./FindNode";

/**
 * Author: Dillon Gorlesky, Brett Dale
 * Date: 05/10/2021
 * The purpose of this class is to create a Navbar with varying components that
 * can be rendered in the App (main) class
 */
const Navbar = () => {
    //These are all the predefined functions from NodeContext
    let [nodeId, setClickedNode] = useContext(NodeContext);
  //  const [name, setName] = useState('https://raw.githubusercontent.com/coolbrett/Capstone/main/Data/nodes.json');
    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [radio, setRadio] = useState("apple");

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const update = (e) => {
        setClickedNode(e.target.value);
    }
/*
    const onMouseEnter = () => {
        if(window.innerWidth < 960){
            setDropdown(false);
        } else {
            setDropdown(true);
        }
    };

    const onMouseLeave = () => {
        if(window.innerWidth < 960){
            setDropdown(false);
        } else {
            setDropdown(false);
        }
    };
*/

    //This is where the information being rendered into App class is being created and formed
   return(
           <nav className={"navbar"}>
                <h3 className={"navbar-logo"}>
                    Visualizing the Internet Movie Database (IMDb)
                </h3>
               <ul className={click ?  'nav-menu active' : 'nav-menu'}>
                <FindNode />
               </ul>
               <p style={{color:"white"}}>Listed: </p>
               <p style={{color:"white"}}>{nodeId}</p>

           </nav>
   );
};

export default Navbar;
