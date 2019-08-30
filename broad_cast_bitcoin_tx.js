const fetch = require("node-fetch");
const push = async () => {

    // let decodetx = { "tx": { "block_height": -1, "block_index": -1, "hash": "0fa41611407b2b60bb82236a70d435c73e48e057b39297c45c6ca369c23617f0", "hex": "0200000001330a267eab80eb788ab125c1afecdbead0a1fc337f19004f8bb6b8a4967ceff4000000006a4730440220272cdcdfa211a995fe56ed7cef1d47259724811fe8d367c15db8edfa7681b0f6022045cb3fd20dd96061ecf8b2028e7b026beac21d79122c0f0ebab6113b66f143f4012102c08aefd6f13d9a9d209d0cfce0be2b780c269ae3afeaa8ed2b02358df742ae72ffffffff0140420f00000000001976a91400a14e6aa9fb5177c776209d105a0587a31fb11288ac00000000", "addresses": ["mfaHXp87jU5M66mzZCJNd9hRezPMQGyU6q", "moy1ssWvjhA9j6qJ4Bu7nvV3zVxZevrvY9"], "total": 1000000, "fees": 0, "size": 191, "preference": "low", "relayed_by": "124.87.166.38", "received": "2019-08-29T02:27:21.324Z", "ver": 2, "double_spend": false, "vin_sz": 1, "vout_sz": 1, "confirmations": 0, "inputs": [{ "prev_hash": "f4ef7c96a4b8b68b4f00197f33fca1d0eadbecafc125b18a78eb80ab7e260a33", "output_index": 0, "script": "4730440220272cdcdfa211a995fe56ed7cef1d47259724811fe8d367c15db8edfa7681b0f6022045cb3fd20dd96061ecf8b2028e7b026beac21d79122c0f0ebab6113b66f143f4012102c08aefd6f13d9a9d209d0cfce0be2b780c269ae3afeaa8ed2b02358df742ae72", "output_value": 1000000, "sequence": 4294967295, "addresses": ["moy1ssWvjhA9j6qJ4Bu7nvV3zVxZevrvY9"], "script_type": "pay-to-pubkey-hash", "age": 1575411 }], "outputs": [{ "value": 1000000, "script": "76a91400a14e6aa9fb5177c776209d105a0587a31fb11288ac", "addresses": ["mfaHXp87jU5M66mzZCJNd9hRezPMQGyU6q"], "script_type": "pay-to-pubkey-hash" }] } }
    let decodetx = { "tx": "0200000001330a267eab80eb788ab125c1afecdbead0a1fc337f19004f8bb6b8a4967ceff4000000006a4730440220272cdcdfa211a995fe56ed7cef1d47259724811fe8d367c15db8edfa7681b0f6022045cb3fd20dd96061ecf8b2028e7b026beac21d79122c0f0ebab6113b66f143f4012102c08aefd6f13d9a9d209d0cfce0be2b780c269ae3afeaa8ed2b02358df742ae72ffffffff0140420f00000000001976a91400a14e6aa9fb5177c776209d105a0587a31fb11288ac00000000" }

    // console.log(JSON.stringify({ decodetx }))
    // 在一个测试链的节点把交易广布出去
    const result = await fetch('https://api.blockcypher.com/v1/btc/test3/txs/push', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decodetx })
    });

    // 打印结果
    console.log(result);
}
push()
/*
➜  Bit-wallet git:(master) ✗ node broad_cast_bitcoin_tx.js
Response {
  size: 0,
  timeout: 0,
  [Symbol(Body internals)]:
   { body:
      PassThrough {
        _readableState: [Object],
        readable: true,
        domain: null,
        _events: [Object],
        _eventsCount: 3,
        _maxListeners: undefined,
        _writableState: [Object],
        writable: false,
        allowHalfOpen: true,
        _transformState: [Object] },
     disturbed: false,
     error: null },
  [Symbol(Response internals)]:
   { url: 'https://api.blockcypher.com/v1/btc/test3/txs/push',
     status: 400,
     statusText: 'Bad Request',
     headers: Headers { [Symbol(map)]: [Object] },
     counter: 0 } }
➜  Bit-wallet git:(master) ✗
*/