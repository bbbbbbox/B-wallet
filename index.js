const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const config = require('config');
const { queryList, insert, update } = require('./async-db')
var nodeExcel = require('excel-export');


// card_id, name, birthday, mail, post_code, address

let dic = { name: "deng", card_id: "123", birthday: "1970-09-09", mail: "abc", post_code: "333", address: "3dd" }
let dic_update = { card_id: 4444, id: 3 }
update(dic_update)
// insert(dic)
// queryList()

// config
const dbConfig = config.get('url');

console.log(dbConfig)


var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


/*************
 * html page
 ************ */

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

router.get('/form.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/form.html'));
});

router.get('/amamzon-form.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/amamzon-form.html'));
});

router.get('/btc-payment.pdf', function (req, res) {
    res.sendFile(path.join(__dirname + '/file/btc-payment.pdf'));
});


// POST method route
app.post('/query', async function (req, res) {
    let dic = req.query
    console.log(dic)
    let r = await queryList()
    res.send(JSON.stringify(r));
});

app.post('/insert', async function (req, res) {
    // let dic = { name: "deng", card_id: "123", birthday: "1970-09-09", mail: "abc", post_code: "333", address: "3dd" }
    // insert(dic)
    // let dic = req.query
    // console.log(req.body)
    let dic = req.body
    let r = await insert(dic)
    res.send(JSON.stringify(r));
});

// "{\"fieldCount\":0,\"affectedRows\":1,\"insertId\":0,\"serverStatus\":2,\"warningCount\":0,\"message\":\"(Rows matched: 1  Changed: 1  Warnings: 0\",\"protocol41\":true,\"changedRows\":1}"
app.post('/update', async function (req, res) {
    // let dic = { name: "deng", card_id: "123", birthday: "1970-09-09", mail: "abc", post_code: "333", address: "3dd" }
    // insert(dic)
    let dic = req.query
    let r = await update(dic)
    res.send(JSON.stringify(r));
});

//add the router
app.use('/', router);
app.use("/assets", express.static(__dirname + '/assets'));
app.use("/css", express.static(__dirname + '/css'));
app.use("/fonts", express.static(__dirname + '/fonts'));

app.listen(process.env.port || 4000);

console.log('Running at Port 4000');