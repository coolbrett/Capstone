import React from 'react'
import Navbar from "./components/Navbar"
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
//import Main from "./components/Main";


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {apiResponse: ""}
    }

    /**
     * This function calls our backend api file!
     */
    callAPI() {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => this.setState({apiResponse: res}));
    }

    componentDidMount() {
        this.callAPI();
    }


//possible error --> video used render() alone with no function declaration
    render() {
        console.log("inside Render");
        console.log("API state: " + this.state.apiResponse);
        return (
            <Router>
                <Navbar/>
                <React.Fragment>

                </React.Fragment>
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
