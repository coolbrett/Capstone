import React, { useState, useContext } from 'react';

const Query = () => {

    const update = () => {
        console.log("here");
    }

    return(
            <view className={"query"}>
                <form >
                <view style={{flexDirection:"column"}}>
                    <view style={{flexDirection:"row"}}>
                        <view style={{flex:1}}>
                            <input type={"text"} placeholder={"0..."} name={"id"}  onChange={update} />
                        </view>
                        <text> &lt; Ranking &lt; </text>
                        <view style={{flex:1}}>
                            <input type={"text"} placeholder={"1000..."} name={"id"}  onChange={update} />
                        </view>
                    </view>
                </view>
                </form>
                <form >
                    <view style={{flexDirection:"column"}}>
                        <view style={{flexDirection:"row"}}>
                            <view style={{flex:1}}>
                                <input type={"text"} placeholder={"0..."} name={"id"}  onChange={update} />
                            </view>
                            <text> &lt; Metascore &lt; </text>
                            <view style={{flex:1}}>
                                <input type={"text"} placeholder={"100..."} name={"id"}  onChange={update} />
                            </view>
                        </view>
                    </view>
                </form>
                <form >
                    <view style={{flexDirection:"column"}}>
                        <view style={{flexDirection:"row"}}>
                            <text> Genre </text>
                            <view style={{flex:1}}>
                                <input type={"text"} placeholder={"Genre..."} name={"id"}  onChange={update} />
                            </view>
                        </view>
                    </view>
                </form>
                <form >
                    <view style={{flexDirection:"column"}}>
                        <view style={{flexDirection:"row"}}>
                            <text> &lt; Testing &lt; </text>
                            <view style={{flex:1}}>
                                <input type={"text"} placeholder={"Search.."} name={"id"}  onChange={update} />
                            </view>
                        </view>
                    </view>
                </form>
                <form >
                    <view style={{flexDirection:"column"}}>
                        <view style={{flexDirection:"row"}}>
                            <view style={{flex:1}}>
                                <input type={"text"} placeholder={"Search.."} name={"id"}  onChange={update} />
                            </view>
                            <text> &lt; Testing &lt; </text>
                            <view style={{flex:1}}>
                                <input type={"text"} placeholder={"Search.."} name={"id"}  onChange={update} />
                            </view>
                        </view>
                    </view>
                </form>
            </view>
    );
};

export default Query;