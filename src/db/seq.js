// const { Sequelize, Model, DataTypes } = require('sequelize');
// import Sequelize from 'sequelize'
const Sequelize = require('sequelize')
const { mysql_conf } = require('../conf/db')
const { isProd, isTest } = require('../utils/env')

const { host, user, password, database } = mysql_conf

const conf = {
    host,
    dialect: 'mysql',
}

// 单元测试不打印单元语句
if (isTest) {
    conf.logging = () => {}
}

// 线上环境使用连接池
if (isProd) {
    conf.pool = {
        max: 5, // 连接池中最大的连接数量
        min: 0, // 最小
        idle: 10000, // 如果一个连接池 10 s 之内没有被使用，则释放
    }
}

const seq = new Sequelize(database, user, password, conf)

// 测试链接
// seq.authenticate().then(()=>{
//     console.log('ok');
// }).catch(()=>{
//     console.log('err');
// })

module.exports = seq
