/**
 * @description user service
 * @author afang
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 获取用户信息
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function getUserInfo(userName, password) {
    // 查询条件
    const whereOpt = {
        userName
    }
    if (password) {
        Object.assign(whereOpt, {password})
    }

    // 查询
    const result = await User.findOne({
        attributes:['id', 'userName', 'nickName', 'picture', 'city'],
        where: whereOpt
    })
    if (result == null) {
        // 未找到
        return result
    }
    // 格式化处理
    const formatRes = formatUser(result.dataValues)
    return formatRes
}
/**
 * 创建用户
 * @param {string} userName   用户名
 * @param {string} password  密码
 * @param {string} gender  性别
 * @param {string} nickName 昵称
 */
async function createUser({userName, password, gender=3, nickName}) {
    const result = await User.create({
        userName,
        password,
        nickName:nickName?nickName:userName,
        gender
    })
    return result.dataValues
}

module.exports = {
    getUserInfo,
    createUser
}