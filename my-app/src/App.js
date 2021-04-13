import React from 'react'
import Navbar from "./components/Navbar"
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
//import Main from "./components/Main";
import Graph from "./components/Graph";


class App {

//possible error --> video used render() alone with no function declaration
    render() {
        return (
            <Router>
                <Navbar/>
                <Graph />
            </Router>
        );
    }
}
export default App;

//*
//function App() {
  //return(
    //  <Router>
  //      <Navbar />
//      </Router>

 // );
//}

//export default App;
