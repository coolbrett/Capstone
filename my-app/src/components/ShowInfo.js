import React from 'react';

const showInfo = (props) => {

    function Newline(){
        const text = props.val;
        const strings = text.split('\n').map((str) => {
            const [label, value] = str.split(':');
            return (
                <div>
                    <u>{label}</u>:<p>{value}</p>
                </div>
            );
        });

        return strings;
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