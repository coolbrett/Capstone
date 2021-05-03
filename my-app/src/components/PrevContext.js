import React, {createContext, useState} from "react";

export const PrevContext = createContext();

export const PrevProvider = (props) => {
    const [prevId, setPrevId] = useState([
        ""
    ]);

    return(
        <PrevContext.Provider value={[prevId, setPrevId,]}>
            {props.children}
        </PrevContext.Provider>
    );
}