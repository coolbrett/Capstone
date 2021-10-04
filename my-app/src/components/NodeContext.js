import React, {useState, createContext} from 'react';
import myData from '../Data/scratch.json'
//import myData from '../Data/nodesInfo2.json'

function onClickNode(nodeId, theData) {
    let clicked = "-";
    let inside = "";
    let check = "";
    let modData = {theData};
    let selectNode = modData.nodes.filter(item => {
        return item.id === nodeId;
    });
    selectNode.forEach(item => {
        if (item.color && item.color === "blue") item.color = "red";
        else item.color = "blue";
         clicked = item.id;
         if(item.id !== check){
                                inside = item.id;
                                //Setting the color of the node clicked to opposite color
                                if (item.color && item.color === "blue") item.color = "red";
                                else item.color = "blue";

                                let selectPrev = modData.nodes.filter(item => {
                                        return item.id === check;
                                });
                                //This sees if the node clicked is the previous node clicked
                                //In order to change last node clicked back to red
                                selectPrev.forEach(items => {
                                        if(items.id === check){
                                                if (items.color && items.color === "blue") items.color = "red";
                                                else items.color = "blue";
                                        }
                                });
                        } else {
                                if (item.color && item.color === "red") item.color = "blue";
                                else item.color = "red";
                                inside = "-";
                        }
    });
}

export const NodeContext = createContext(onClickNode);

export const NodeProvider = (props) => {
    const [nodeId, setClickedNode] = useState([
       "_____"
    ]);

    const [prevId, setPrevId] = useState([
       ""
    ]);

    const [data, setData] = useState([

    ]);

    const [color, setColor] = useState([
        "red"
    ]);

    let [theData, setTheData] = useState([
        myData
    ]);

    return(
        <NodeContext.Provider value={[
            prevId, setPrevId,
            nodeId, setClickedNode,
            color, setColor,
            theData, setTheData,
        ]}>
            {props.children}
        </NodeContext.Provider>
    );
}