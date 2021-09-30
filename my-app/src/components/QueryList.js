import React, { useState, useContext } from 'react';
import  Query  from './Query';

const QueryList = () => {

    return(
        <nav className={"query-list"}>
            <h3 className={"query-list-logo"}>
                Perform Queries:
            </h3>
            <Query/>
        </nav>
    );
};

export default QueryList;