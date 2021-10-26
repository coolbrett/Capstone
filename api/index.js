const express = require('express')
const app = express()
const port = 2424
const fs = require('fs')
const axios = require('axios')
const cors = require('cors');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/', (req, res) => {
    res.send('Server is up!')
})

app.get('/brett', (req, res) => {
    let content = fs.readFileSync('./brett.txt', "utf-8");
    res.send(content);
})

axios
    .post(`http://localhost:${port}/post`, {
        todo: 'Buy the milk'
    })
    .then(res => {
        console.log(`statusCode: ${res.status}`)
        console.log(res)
    })
    .catch(error => {
        console.error(error)
    })

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.post('/post', (req, res) => {
    console.log("req: " + req.body.todo)
    //console.log(res);
})

app.get('/post', (req, res) => {
    res.send("");
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
    console.log(`brett is on http://localhost:${port}/brett`)
    console.log(`post example on http://localhost:${port}/post`)
})