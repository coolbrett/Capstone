import React from 'react'
import Navbar from "./components/Navbar"
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
//import Main from "./components/Main";


function App() {

//possible error --> video used render() alone with no function declaration
        return (
            <Router>
                <Navbar/>
                <Graph />
            </Router>
        );
}
export default App;

