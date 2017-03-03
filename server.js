/* eslint comma-dangle: "off" */

import generatePage from './frontend/js/ssr/generate_page';
import template from './frontend/js/ssr/template';

const express = require('express');
const path = require('path');
// const cors = require('cors');

const port = process.env.PORT || 8080;
const app = express();


// app.use(cors());

// serve static assets normally
app.use(express.static(path.join(__dirname, '')));

app.use('*/assets/index.css', (request, response) => {
    response.sendFile(path.join(__dirname, 'assets', 'index.css'));
});

app.get('/csr/assets/bundle.js', (request, response) => {
    response.sendFile(path.join(__dirname, 'assets', 'bundle.js'));
});

// handle every other route with index.html
app.get('/csr/*', (request, response) => {
    response.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/ssr/*', (request, response) => {
    const appString = generatePage(request.originalUrl);
    const initialState = {};
    response.send(template({
        body: appString,
        title: 'Hello World from the server',
        initialState: JSON.stringify(initialState)
    }));
});

app.listen(port);
console.log(`server started on port ${port}`);
