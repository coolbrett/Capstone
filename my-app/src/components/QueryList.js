import React, { useState, useContext } from 'react';
import  Query  from './Query';

const QueryList = () => {

    return(
        <nav className={"query-list"}>
            <h3 className={"query-list-logo"} >
                <u>Perform Queries: </u>
            </h3>
            <Query name2={" Ranking "} min={"0..."} max={"...1000"}/>
            <Query name2={"Metascore"} min={"0..."} max={"...100"}/>
            <Query name2={" Rating "} min={"0..."} max={"...10"}/>

        </nav>
    );
};

export default QueryList;