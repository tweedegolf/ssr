/* eslint comma-dangle: "off" */

const express = require('express');
const path = require('path');
// const cors = require('cors');

const port = process.env.PORT || 8080;
const app = express();

// app.use(cors());

// serve static assets normally
app.use(express.static(path.join(__dirname, '')));

// app.use('*/index.html', (request, response) => {
//     response.sendFile(path.join(__dirname, 'index.html'));
// });

app.use('*/assets/index.css', (request, response) => {
    response.sendFile(path.join(__dirname, 'assets', 'index.css'));
});

app.get('*/assets/bundle.js', (request, response) => {
    response.sendFile(path.join(__dirname, 'assets', 'bundle.js'));
});

app.listen(port);
console.log('server started on port ' + port);
