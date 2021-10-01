import React, { useState, useContext } from 'react';
import  Query  from './Query';
import { Button } from "./Button";

const QueryList = () => {

    return(
        <nav className={"query-list"}>
            <h3 className={"query-list-logo"} >
                <u>Perform Queries: </u>
            </h3>
            <Query name2={" Ranking "} min={"0..."} max={"...1000"}/>
            <Query name2={"Metascore"} min={"0..."} max={"...100"}/>
            <Query name2={" Rating "} min={"0..."} max={"...10"}/>

            <br/>
            <Button >Submit </Button>
        </nav>
    );
};

export default QueryList;