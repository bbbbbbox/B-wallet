const bitcoin = require('bitcoinjs-lib');
const bs58 = require('bs58')
// 测试环境
const TESTNET = bitcoin.networks.testnet
// 正式环境
// const TESTNET = bitcoin.networks.bitcoin
const fetch = require("node-fetch");


function generate_pks() {

    const keyPair = bitcoin.ECPair.makeRandom({ network: TESTNET })

    const bytes = Buffer.from(keyPair.privateKey, 'hex')
    const pk = bs58.encode(bytes)
    const bytes_pb = Buffer.from(keyPair.publicKey, 'hex')
    const pbk = bs58.encode(bytes_pb)

    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: TESTNET })

    console.log("wif:" + keyPair.toWIF())
    console.log("私钥:" + pk)
    console.log("公钥:" + pbk)
    console.log("钱包地址:" + address)
}


const transfer1 = () => {
    // const transfer1 = async () => {
    // 创建钱包
    const alice = bitcoin.ECPair.fromWIF('cPBWtnLonM1P8MnLPNpbuzeQN28KQAxCYqKQRV7fsPFwb8EAo5HU', TESTNET);
    console.log(alice.privateKey)
    // 构建交易 builder
    const txb = new bitcoin.TransactionBuilder(TESTNET);

    // 添加交易中的 Inputs，假设这个 UTXO 有 15000 satoshi
    txb.addInput('b7f4e6261781c863a9d4e9e6cd9c2cc0c021ca8cbe41b9c9fcfe867400f833d6', 0);
    // 添加交易中的 Outputs，矿工费用 = 15000 - 12000 = 3000 satoshi
    // addOutput 方法的参数分别为收款地址和转账金额
    txb.addOutput('mfaHXp87jU5M66mzZCJNd9hRezPMQGyU6q', 1000000);

    // 交易签名
    txb.sign(0, alice);
    // 打印签名后的交易 hash
    console.log(txb.build().toHex());
    let tx = txb.build().toHex()

    // 在一个测试链的节点把交易广播出去
    // const result = await fetch('https://api.blockcypher.com/v1/btc/test3/txs/push', {
    //     method: 'post',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ tx })
    // });
    fetch('https://api.blockcypher.com/v1/btc/test3/txs/push', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tx: txb.build().toHex() })
    }).then(function (response) {
        return response.json();
    }).then(function (myJson) {
        console.log("++++++++++++++");
        console.log(JSON.stringify(myJson));
    });

    // // 打印结果
    // console.log(result);
};

transfer1();



// https://testnet.blockexplorer.com/api/addr/moy1ssWvjhA9j6qJ4Bu7nvV3zVxZevrvY9/utxo

/*[{
	"address": "moy1ssWvjhA9j6qJ4Bu7nvV3zVxZevrvY9",
	"txid": "b7f4e6261781c863a9d4e9e6cd9c2cc0c021ca8cbe41b9c9fcfe867400f833d6",
	"vout": 1,
	"scriptPubKey": "76a9145caecff0d680dd54efde97044d9e7d623ee1585488ac",
	"amount": 0.01,
	"satoshis": 1000000,
	"height": 1576028,
	"confirmations": -4773
}, {
	"address": "moy1ssWvjhA9j6qJ4Bu7nvV3zVxZevrvY9",
	"txid": "29d5a6c149625b904cf8381e016b4a063745e5d66c20d085a0b6fb907000c572",
	"vout": 0,
	"scriptPubKey": "76a9145caecff0d680dd54efde97044d9e7d623ee1585488ac",
	"amount": 0.01,
	"satoshis": 1000000,
	"height": 1576028,
	"confirmations": -4773
}, {
	"address": "moy1ssWvjhA9j6qJ4Bu7nvV3zVxZevrvY9",
	"txid": "f4ef7c96a4b8b68b4f00197f33fca1d0eadbecafc125b18a78eb80ab7e260a33",
	"vout": 0,
	"scriptPubKey": "76a9145caecff0d680dd54efde97044d9e7d623ee1585488ac",
	"amount": 0.01,
	"satoshis": 1000000,
	"height": 1575411,
	"confirmations": -4156
}]*/


/**
 *
 * ➜  Bit-wallet git:(master) ✗ node bitcoin.js
Deprecation Warning: TransactionBuilder will be removed in the future. (v6.x.x or later) Please use the Psbt class instead. Examples of usage are available in the transactions-psbt.js integration test file on our Github. A high level explanation is available in the psbt.ts and psbt.js files as well.
DEPRECATED: TransactionBuilder sign method arguments will change in v6, please use the TxbSignArg interface
0200000001330a267eab80eb788ab125c1afecdbead0a1fc337f19004f8bb6b8a4967ceff4000000006a4730440220272cdcdfa211a995fe56ed7cef1d47259724811fe8d367c15db8edfa7681b0f6022045cb3fd20dd96061ecf8b2028e7b026beac21d79122c0f0ebab6113b66f143f4012102c08aefd6f13d9a9d209d0cfce0be2b780c269ae3afeaa8ed2b02358df742ae72ffffffff0140420f00000000001976a91400a14e6aa9fb5177c776209d105a0587a31fb11288ac00000000
{"tx":{"block_height":-1,"block_index":-1,"hash":"0fa41611407b2b60bb82236a70d435c73e48e057b39297c45c6ca369c23617f0","addresses":["moy1ssWvjhA9j6qJ4Bu7nvV3zVxZevrvY9","mfaHXp87jU5M66mzZCJNd9hRezPMQGyU6q"],"total":1000000,"fees":0,"size":191,"preference":"low","relayed_by":"124.87.166.38","received":"2019-08-30T02:30:49.938228137Z","ver":2,"double_spend":false,"vin_sz":1,"vout_sz":1,"confirmations":0,"inputs":[{"prev_hash":"f4ef7c96a4b8b68b4f00197f33fca1d0eadbecafc125b18a78eb80ab7e260a33","output_index":0,"script":"4730440220272cdcdfa211a995fe56ed7cef1d47259724811fe8d367c15db8edfa7681b0f6022045cb3fd20dd96061ecf8b2028e7b026beac21d79122c0f0ebab6113b66f143f4012102c08aefd6f13d9a9d209d0cfce0be2b780c269ae3afeaa8ed2b02358df742ae72","output_value":1000000,"sequence":4294967295,"addresses":["moy1ssWvjhA9j6qJ4Bu7nvV3zVxZevrvY9"],"script_type":"pay-to-pubkey-hash","age":1575411}],"outputs":[{"value":1000000,"script":"76a91400a14e6aa9fb5177c776209d105a0587a31fb11288ac","addresses":["mfaHXp87jU5M66mzZCJNd9hRezPMQGyU6q"],"script_type":"pay-to-pubkey-hash"}]}}
 */


/**
 *
{
    "tx": {
        "block_height": -1,
        "block_index": -1,
        "hash": "0fa41611407b2b60bb82236a70d435c73e48e057b39297c45c6ca369c23617f0",
        "addresses": [
            "moy1ssWvjhA9j6qJ4Bu7nvV3zVxZevrvY9",
            "mfaHXp87jU5M66mzZCJNd9hRezPMQGyU6q"
        ],
        "total": 1000000,
        "fees": 0,
        "size": 191,
        "preference": "low",
        "relayed_by": "124.87.166.38",
        "received": "2019-08-29T02:27:21.324214118Z",
        "ver": 2,
        "double_spend": false,
        "vin_sz": 1,
        "vout_sz": 1,
        "confirmations": 0,
        "inputs": [
            {
                "prev_hash": "f4ef7c96a4b8b68b4f00197f33fca1d0eadbecafc125b18a78eb80ab7e260a33",
                "output_index": 0,
                "script": "4730440220272cdcdfa211a995fe56ed7cef1d47259724811fe8d367c15db8edfa7681b0f6022045cb3fd20dd96061ecf8b2028e7b026beac21d79122c0f0ebab6113b66f143f4012102c08aefd6f13d9a9d209d0cfce0be2b780c269ae3afeaa8ed2b02358df742ae72",
                "output_value": 1000000,
                "sequence": 4294967295,
                "addresses": [
                    "moy1ssWvjhA9j6qJ4Bu7nvV3zVxZevrvY9"
                ],
                "script_type": "pay-to-pubkey-hash",
                "age": 1575411
            }
        ],
        "outputs": [
            {
                "value": 1000000,
                "script": "76a91400a14e6aa9fb5177c776209d105a0587a31fb11288ac",
                "addresses": [
                    "mfaHXp87jU5M66mzZCJNd9hRezPMQGyU6q"
                ],
                "script_type": "pay-to-pubkey-hash"
            }
        ]
    }
}
 *  */