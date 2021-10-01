import React, { useState, useContext } from 'react';
import "./Query.css";
const Query = ({name2, min, max}) => {

    const update = () => {
        console.log("here");
    }

    return(
        <div className='container'>
            <div className='col'>
                <input type='text' placeholder={min} onChange={update} />
            </div>
            <div className="col">&lt;{name2}&lt;</div>
            <div className="col">
                <input type='text' placeholder={max} onChange={update} />
            </div>
        </div>
    );
};

/**
 * <form >
 <view style={{flexDirection:"column"}}>
 <view style={{flexDirection:"row"}}>
 <view >
 <input className={"query2"} type={"text"} required={true} placeholder={"0..."} name={"id"}  onChange={update} />
 </view>
 <text className={"query2"}> &lt; Metascore &lt; </text>
 <view >
 <input className={"query2"} type={"text"} required={true} placeholder={"100..."} name={"id"}  onChange={update} />
 </view>
 </view>
 </view>
 </form>
 *
 * <form >
 <view style={{flexDirection:"column"}}>
 <view style={{flexDirection:"row"}}>
 <view >
 <input type={"text"} placeholder={"Genre..."} name={"id"}  onChange={update} />
 </view>
 </view>
 </view>
 </form>
 */
export default Query;