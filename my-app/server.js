const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.post('/', function (req, res) {
    res.send('POST request to the homepage')
})

app.listen(process.env.PORT || 5000);
