const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
    //__dirname : It will resolve to your project folder.
});

router.get('/form.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/form.html'));
});

router.get('/amamzon-form.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/amamzon-form.html'));
});

//add the router
app.use('/', router);
app.use("/assets", express.static(__dirname + '/assets'));
app.use("/css", express.static(__dirname + '/css'));
app.use("/fonts", express.static(__dirname + '/fonts'));

app.listen(process.env.port || 4000);

console.log('Running at Port 4000');