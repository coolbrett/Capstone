import React, { Component, useState } from 'react';
import './Button.css';
import { Link } from 'react-router-dom';
import ReactFileReader from 'react-file-reader';
import * as XLSX from 'xlsx';
import DataTable from 'react-data-table-component';
import xtypejs from 'xtypejs'





export function Button() {
    const [name, setName] = useState('');

    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);



    //Process the CSV data
    const processData = dataString => {
        const dataStringLines = dataString.split(/\r\n|\n/);
        //Regex used to properly get the headers of each column
        const colHeaders = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);

        const list = [];
        for (let i = 1; i < dataStringLines.length; i++) {
            //Regex used to split each row
            const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
            //Making sure the length of a row isn't longer then amount of headers bc it'll cause an error
            if (colHeaders && row.length === colHeaders.length) {
                const obj = {};
                //Looping through each column of the row
                for (let j = 0; j < colHeaders.length; j++) {
                    let value = row[j]; //This is the data stored in the column of the row
                    if (value.length > 0) {
                        if (value[0] === '"')//Is an empty value
                            value = value.substring(1, value.length - 1);
                        if (value[value.length - 1] === '"')
                            value = value.substring(value.length - 2, 1);
                    }
                    if (colHeaders[j]) {
                        obj[colHeaders[j]] = value;
                    }
                }

                //Removing any blank rows
                if (Object.values(obj).filter(x => x).length > 0) {
                    list.push(obj);
                }
            }
        }

        //Prepare the columns list from colHeaders
        const columns = colHeaders.map(c => ({
            name: c,
            selector: c,
        }));

        setData(list);
        setColumns(columns);
    }

    function csvJSON(csv) {
        const lines = csv.split('\n')
        const result = []
        const headers = lines[0].split(',')

        for (let i = 1; i < lines.length; i++) {
            if (!lines[i]) continue
                const obj = {}
                const currentline = lines[i].split(',')

            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j]
            }
            result.push(obj)
        }
        return result
    }

    //This handles the file uploading
    const handleFileUpload = e => {
        console.log("hey");
    }

    return (
        //This is the title of the page above the upload button
        //Also where we declare what types of files can be read in
        <div>
            <input
                type="file"
                accept=".csv,.xlsx,.xls"
                name={"IMBD-Movie-Data.csv"}
                onClick={handleFileUpload}
            />
        </div>
    );
}

