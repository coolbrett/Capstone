import React, { useState } from 'react';
import { Button } from "./Button"
import "./Navbar.css"
import Dropdown from "./Dropdown"
import { Link } from 'react-router-dom'
import {RadioButton} from "./RadioButton";


function Navbar(){
    const [name, setName] = useState('https://github.com/coolbrett/Capstone/blob/main/Data/nodes.json');
    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [radio, setRadio] = useState("apple");


    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const loading = () => {
        setName()
        console.log("Hi I'm loading");
        fetch(name, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'applicaton/json',
                "Access-Control-Allow-Origin": '*'
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            console.log(data)
        });
    }

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
   return(

       <>
           <nav className={"navbar"}>
                <Link to={'/'} className={"navbar-logo"}>
                    Graph Visualization
                </Link>
               <div className={"menu-icon"} onClick={handleClick}>
                   <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
               </div>
               <ul className={click ?  'nav-menu active' : 'nav-menu'}>
                   <li className={"nav-item"} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                       <Link to={"/services"} className={'nav-links'} onClick={closeMobileMenu}>
                           Services <i className={"fas fa-caret-down"}/>
                       </Link>
                       {dropdown && <Dropdown />}
                   </li>
                   <li className={"nav-item"}>
                       <Link to={"/radio"} className={'nav-links'} onClick={closeMobileMenu}>
                           More Info
                       </Link>
                   </li>

                   <li className={"nav-item"}>
                       <Link to={"/"} className={'nav-links'} onClick={loading}>
                           Load File
                       </Link>
                   </li>
               </ul>

               <RadioButton />
           </nav>
       </>
   );
}

export default Navbar;
