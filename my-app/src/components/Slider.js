import React from "react";

const Slider = (props) =>{

    const update = (event, setValue) => {
        setValue(parseInt(event.target.value),10);//Sets value of textbox
    }

    return(
        <div>
            <input type={"range"} min={props.min} max={props.max} onChange={(event) => update(event, props.setVal)}/>
            {props.val}
        </div>
    );

}

export default Slider;