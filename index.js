const express = require('express');
const docusign = require('docusign-esign');
var cors = require('cors');

const apiClient = new docusign.ApiClient();

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

app.use(express.json());
app.use(express.static(__dirname + '/src/views'));
app.use(cors());

app.get('/', (req, res) => {
    res.sendfile('./src/views/index.html');
});

app.get('/checkStatus', (req, res) => {
    res.sendfile('./src/views/checkStatus.html');
});

app.use('/api/docusign',require('./src/api/routes'));

app.listen(port, host, function (error) {
    if (error)
        throw error;
    console.log('Your server is running on http://' + host + ':' + port + '.');
});