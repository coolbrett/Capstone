import React from 'react';

/**
 * This is the class for printing out the data of each nodes correctly
 * @Author: Dillon Gorlesky
 * @Author Brett Dale
 * @Date: 12/05/2021
 */
const showInfo = (props) => {

    /**
     * This splits the data first on new lines then by : to add an underlined feature
     * @returns {*}
     * @constructor
     */
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