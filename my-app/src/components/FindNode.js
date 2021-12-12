import React, {useState, useContext} from 'react';
import { NodeContext } from "./NodeContext";
import myData from "../Data/scratch.json";

let last = "";
/**
 * This is the class finding the node from the search bar
 * @Author: Dillon Gorlesky
 * @Author Brett Dale
 * @Date: 12/05/2021
 */
const FindNode = (props) => {
    let context = useContext(NodeContext)
    let [theData, setTheData] = context;

    let [nodeId, setClickedNode] = context;
    //This is setting the previously clicked node to be stored elsewhere
    let [prevId, setPrevId] = context;
    const [id, setId] = useState('');

    /**
     * When a new node id is searched for it sets the value
     * @param e
     */
    const update = (e) => {
        setId(e.target.value);
    }

    if(theData.length === 1){
        setTheData(myData);
    }

    const setData = function(dataHere){
        setTheData(dataHere);
    }

    /**
     * This sets the new color of a clicked node
     * @param nodeID
     */
    const testing = function(nodeID) {
        let modData = {...theData};
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
                last = item.id;
            } else {
                //Setting the previous node to be empty
                //For whatever reason it only works if I do this
                item.color = "red"
                last = "";
            }
        });
        props.functionCallFromParent(last);
        //setClickedNode(nodeID);
        setData(modData);
    };

    /**
     * Passes information back to parent then down to GraphView
     * @param e
     */
    const childFunction = (e) =>{
        console.log("here")
        e.preventDefault();
        props.functionCallFromParent(last);
    }


    return(
        <form action={"./"}>
            <input type={"text"} placeholder={"Search.."} name={"id"} value={id} onChange={update} />
            <button type={"submit"} onClick={childFunction.bind(this)} >Submit</button>
        </form>
    );

}

export default FindNode;