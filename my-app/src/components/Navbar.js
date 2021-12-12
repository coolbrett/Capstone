import React, { useState} from 'react';
import "./Navbar.css"

/**
 * This is the class for creating the navbar
 * @Author: Dillon Gorlesky
 * @Author Brett Dale
 * @Date: 12/05/2021
 */
const Navbar = (props) => {
    let [click, setClick] = useState(false);

    /**
     * Send data to the parent function the pass to graph view
     * @param e
     */
    const childFunction = (e) =>{
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

export default Navbar;
