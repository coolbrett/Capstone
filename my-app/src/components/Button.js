import React, { Component, useState } from 'react';
import './Button.css';
import { Link } from 'react-router-dom';
import ReactFileReader from 'react-file-reader';
import * as XLSX from 'xlsx';
import DataTable from 'react-data-table-component';

export function Button() {

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

    //This handles the file uploading
    const handleFileUpload = e => {
        const file = e.target.files[0];
        const reader = new FileReader();//To read in file
        reader.onload = (evt) => {
            //Parse the data
            const basicString = evt.target.result;
            const wbook = XLSX.read(basicString, {type: 'binary'});
            //Get the first worksheet
            const wsheetName = wbook.SheetNames[0];
            const worksheet = wbook.Sheets[wsheetName];
            //Convert the array of arrays
            const data = XLSX.utils.sheet_to_csv(worksheet, {header: 1});
            //processData(data);
            //<AsyncCSV /> //CHANGE ME!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            //TRYING TO SEND CSV INPUTTED FILE ELSEWHERE HERE OR SOMEWHERE NEARBY
        };
        reader.readAsBinaryString(file);

    }

    return (
        //This is the title of the page above the upload button
        //Also where we declare what types of files can be read in
        <div>
            <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
            />
        </div>
    );
}
export default Button;
