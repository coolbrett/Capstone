import React, { useState, useContext } from 'react';
import "./Navbar.css"
import { NodeContext }from "./NodeContext";
import FindNode from "./FindNode";

const Navbar = (props) => {
    //let [nodeId, setClickedNode] = useContext(NodeContext);
    let [click, setClick] = useState(false);

    //console.log("Node ID: " + nodeId);

    /*const update = (e) => {
        setClickedNode(e.target.value);
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
*/
    const childFunction = (e) =>{
        console.log("here nav " + e)
        props.functionCallFromParent(e);
    }

   return(
           <nav className={"navbar"}>
                <h3 className={"navbar-logo"}>
                    Visualizing the Internet Movie Database (IMDb)
                </h3>
               <ul className={click ?  'nav-menu active' : 'nav-menu'}>
               </ul>
               <p style={{color:"white"}}>Listed: </p>
               <p style={{color:"white"}}>{props.valueFromParent}</p>

           </nav>
   );
};
//               <p style={{color:"white"}}>{props.nodeId}</p>
export default Navbar;
