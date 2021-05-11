import React, {useState, useContext} from 'react';
import { NodeContext } from "./NodeContext";
//import myData from "../Data/scratch.json";
import myData from '../Data/nodesInfo2.json'

/**
 * This file handles finding nodes within our graph once the React app is launched
 */
const FindNode = () => {
    let data = myData;
    let context = useContext(NodeContext)
    let [nodeId, setClickedNode] = context;
    //This is setting the previously clicked node to be stored elsewhere
    let [prevId, setPrevId] = context;

    /**
     * State to hold and set ID data
     */
    const [id, setId] = useState('');

    /**
     * Function to update ID once new node is clicked
     * @param e node to set ID field to
     */
    const update = (e) => {
        setId(e.target.value);
    }

    /**
     * Function to change what node is set to the clicked node
     * @param e node to change to
     */
    const changing = (e) => {
        e.preventDefault();
        setClickedNode(id);
        testing(id);
        setId('');
    }

    /**
     * Function to set the data
     * @param dataHere data to set
     */
    const setData = function(dataHere){
        data = dataHere;
    }

    /**
     * This function sets the clicked node to blue, and the previous clicked node back to red
     * @param nodeID node to set its color to blue
     */
    const testing = function(nodeID) {
        let modData = {...myData};
        let selectNode = modData.nodes.filter(item => {
            return item.id === nodeID;
        });
        selectNode.forEach(item => {
            if(item.color === undefined){
                item.color = "red";
            }
            //If clicked node isn't the previously clicked node
            //Setting the color of the node clicked to opposite color
            if(item.color === "red") {
                item.color = "blue";
            } else {
                item.color = "red";
            }
            if(item.id !== prevId) {
                //Getting previous node id
                let selectPrev = modData.nodes.filter(items => {
                    return items.id === prevId;
                });

                //This is where the previous node is switched back to red
                selectPrev.forEach(items => {
                    items.color = "red";
                });
                setPrevId(nodeID);
            } else {
                //Setting the previous node to be empty
                //For whatever reason it only works if I do this
                setPrevId("");
            }
        });
        setClickedNode(nodeID);
        setData(modData);
    };


    return(
        <form action={"./"}>
            <input type={"text"} placeholder={"Search.."} name={"id"} value={id} onChange={update} />
            <button type={"submit"} onClick={changing}>Submit</button>
        </form>
    );

}

export default FindNode;
