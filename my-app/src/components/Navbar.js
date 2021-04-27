import React, { useState } from 'react';
import { Button } from "./Button"
import "./Navbar.css"
import Dropdown from "./Dropdown"
import { Link } from 'react-router-dom'
import {RadioButton} from "./RadioButton";
import axios from "axios";


function Navbar(nodeId){
    const [name, setName] = useState('https://raw.githubusercontent.com/coolbrett/Capstone/main/Data/nodes.json');
    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [radio, setRadio] = useState("apple");

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

   const loading = () => {
        console.log("Hi I'm loading");
        console.log(name);
        axios.get(name).then(data => {
            console.log(data);
        });
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
   return(

       <>
           <nav className={"navbar"}>
                <Link to={'/'} className={"navbar-logo"}>
                    Visualizing the Internet Movie Database (IMDb)
                </Link>
               <div className={"menu-icon"} onClick={handleClick}>
                   <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
               </div>
               <ul className={click ?  'nav-menu active' : 'nav-menu'}>
                   <li className={"nav-item"}>
                       <Link to={"/"} className={'nav-links'} onClick={loading}>
                           Load File
                       </Link>
                   </li>
               </ul>
               <p style={{color:"white"}}>Listed: </p>
               <p style={{color:"white"}}>{nodeId.clickedNode}</p>

           </nav>
       </>
   );
}

export default Navbar;
