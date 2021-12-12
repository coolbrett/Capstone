import React, {useState} from 'react';
import "./Query.css";

/**
 * This is the class for each individual query
 * @Author: Dillon Gorlesky
 * @Author Brett Dale
 * @Date: 12/05/2021
 */
const Query = (props) => {
    const[name2, setName2] = useState(props.name2);

    const update = (event, setValue) => {
        if(isNumeric(event.target.value)){//Value entered is not numeric
            console.log(event.target.value); //Gets value put into text box
            setValue(event.target.value);//Sets value of textbox
        }
    }

    /**
     * Checks if a string is numeric or not
     * @param str
     * @returns {boolean}
     */
    function isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }

    return(
        <div className='container'>
            <div className='col'>
                <input type='text' style = {{width: 50}} value={props.min} onChange={(event) => update(event, props.setMin)} />
            </div>
            <div className="col">&lt;{name2}&lt;</div>
            <div className="col">
                <input type='text' style = {{width: 50}} value={props.max} onChange={(event) => update(event, props.setMax)} />
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