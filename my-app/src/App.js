import React from 'react';
import Navbar from "./components/Navbar"
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import * as XLSX from 'xlsx';
import DataTable from 'react-data-table-component';


function App() {
  return(
      <Router>
        <Navbar />
      </Router>

  );
}

export default App;