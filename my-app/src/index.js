import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Neo4jProvider, createDriver } from "use-neo4j";

const driver = createDriver('neo4j+s', '4f877cd8.databases.neo4j.io', 7687, 'neo4j', '1TIT1myoa1kmE-TkrEmeZab6GvLzax8DTif-SW4HFK8');

ReactDOM.render(
    <React.StrictMode>
        <Neo4jProvider driver={driver}>
            <App />
        </Neo4jProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
