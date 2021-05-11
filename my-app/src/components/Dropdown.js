import React, { useState } from 'react';
import { MenuItems } from './MenuItems';
import './Dropdown.css';
import { Link } from 'react-router-dom';

/**
 * This file represents our Dropdown component that was required for a previous sprint
 *
 * @author Dillon Gorlesky
 * @author Brett Dale
 */
function Dropdown(){

    /**
     * State for whether it has been clicked or not
     */
    const [click, setClick] = useState(false);

    /**
     * This function toggles between clicked and not clicked
     */
    const handleClick = () => setClick(!click);

    return(
      <>
          <ul onClick={handleClick} className={click ? 'dropdown-menu clicked' : 'dropdown-menu'} >
              {MenuItems.map((item, index) => {
                  return (
                      <li key={index}>
                          <Link className={item.cName} to={item.path} onClick={() => setClick(false)}>
                              {item.title}
                          </Link>
                      </li>
                  )
              })}
          </ul>

      </>
    );
}

export default Dropdown;
