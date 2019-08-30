const request = require('request');
let addr = 'moy1ssWvjhA9j6qJ4Bu7nvV3zVxZevrvY9'
let apiUrl = 'https://testnet.blockexplorer.com/api/addr/'
// log unspent transactions
request.get(apiUrl + addr + '/utxo', (err, req, body) => {
    console.log(JSON.parse(body))
}
);
// log balance
request.get(apiUrl + addr + '/balance', (err, req, body) => {
    console.log(JSON.parse(body))
}
);
https://testnet.blockexplorer.com/api/addr/moy1ssWvjhA9j6qJ4Bu7nvV3zVxZevrvY9/utxo