
const { isProd } = require('../utils/env')

let REDIS_CONf = {
    port:15001,
    host:'39.107.246.117',
}

const mysql_conf = {
    host:'39.107.246.117',
    dialect:'mysql',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'koaBlog'
}
if (isProd) {
    REDIS_CONf = {
        port:15001,
        host:'39.107.246.117',
    }
    // 线上的环境mysql 配置
    mysql_conf = {
        host:'39.107.246.117',
        dialect:'mysql',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'koaBlog'
    }
}

module.exports ={
    REDIS_CONf,
    mysql_conf
}