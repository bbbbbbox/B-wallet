const mysql = require('mysql')
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: '8889',
    password: 'root',
    database: "bwallet"
})

let query = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {

                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}


let insert_user = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {

                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}

async function selectAllData() {
    let sql = 'SELECT * FROM `user`'
    let dataList = await query(sql)
    return dataList
}

async function queryList() {
    let dataList = await selectAllData()
    return dataList
}

async function insert(dic) {
    let sql = `INSERT INTO user ( card_id, name, birthday, mail, post_code, address) VALUES ( '${dic.card_id}', '${dic.name}', '${dic.birthday}', '${dic.mail}', '${dic.post_code}', '${dic.address}')`
    console.log(sql)
    let info = await insert_user(sql)
    console.log(info)
    console.log(info["affectedRows"])
    return info
}


async function update(dic) {
    // let sql = ("UPDATE user SET card_id = :title  where id = :id", { card_id: dic.card_id, id: dic.id })
    let sql = `UPDATE user SET card_id = ${dic.card_id}  where id = ${dic.id}`
    console.log("sql:" + JSON.stringify(sql))
    let info = await query(sql)
    console.log(info)
    console.log(info["affectedRows"])
    return JSON.stringify(info)
}


module.exports = { query, queryList, insert, update }