import React, {useState, createContext} from 'react';
import myData from '../Data/scratch.json'
//import myData from '../Data/nodesInfo2.json'

/**
 * Author: Dillon Gorlesky, Brett Dale
 * Date: 05/10/2021
 * The purpose of this function is to allow the other classes to set nodes
 * when clicked/searched
 * @param nodeId: The name of the node clicked
 */
function onClickNode(nodeId) {
    let clicked = "-";
    let inside = "";
    let check = "";
    let modData = {myData};
    //Filtering through the data to find the node clicked
    let selectNode = modData.nodes.filter(item => {
        return item.id === nodeId;
    });
    selectNode.forEach(item => {
        //Setting the color of the node
        if (item.color && item.color === "blue") item.color = "red";
        else item.color = "blue";
         clicked = item.id;
         if(item.id !== check){
                                inside = item.id;
                                //Setting the color of the node clicked to opposite color
                                if (item.color && item.color === "blue") item.color = "red";
                                else item.color = "blue";

                                //Getting the id of the previous node
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
                                //if node clicked is previous node
                                if (item.color && item.color === "red") item.color = "blue";
                                else item.color = "red";
                                inside = "-";
                        }
    });
}

//Creating context which allows us to export the functions and use them in other classes
export const NodeContext = createContext(onClickNode);

//The purpose of this is to allow is to predefine the functions used and shared between classes
export const NodeProvider = (props) => {
    //Sharing the nodeClicked information
    const [nodeId, setClickedNode] = useState([
       "_____"
    ]);

    //Sharing the previous node clicked information
    const [prevId, setPrevId] = useState([
       ""
    ]);

    //Sharing the data (unmodified and modified) between classes
    const [data, setData] = useState([

    ]);

    //Sharing the color of the clicked node (used mainly for testing)
    const [color, setColor] = useState([
        "red"
    ]);


    //This is how we're allowing the other classes to view the information being
    //Shared
    return(
        <NodeContext.Provider value={[
            prevId, setPrevId,
            nodeId, setClickedNode,
            color, setColor,
        ]}>
            {props.children}
        </NodeContext.Provider>
    );
}