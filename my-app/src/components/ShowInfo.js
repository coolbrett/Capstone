import React, { useState, useContext } from 'react';

const showInfo = (props) => {

    function Newline(){
        const text = props.val;
        const newText = text.split('\n').map(str => <p>{str}</p>);

        return newText;
    }

    return(
        <div className={"container"}>
            <div className={"col"}>
                <h2>Node Information{"\n"}</h2>
                <text style={{fontSize:11}}>{Newline()}</text>
            </div>

        </div>
    );
};


export default showInfo;
