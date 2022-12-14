/**
 * @description user controller
 * @author afang
 */

const { getUserInfo, createUser } = require('../services/user')
const { SuccessModel, ErrorModel} = require('../model/ResModel')
const { registerUserNameNotEXistInfo, registerUserNameExistInfo, registerFailInfo } = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')

/**
 * 用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName) {
    // 业务逻辑处理
    // 调用service 获取数据
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        // 已存在
        return new SuccessModel(userInfo) 
        // {errorno :0 ,data:{...}}
    }else{
        // 不存在
        return new ErrorModel(registerUserNameNotEXistInfo)
    }
    // 统一返回格式
}
/**
 * 
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别(1 男 2 女 3 保密) 
 */
async function register({userName, password, gender}){
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        // 用户名已存在
        return new ErrorModel(registerUserNameExistInfo)
    }
    // 注册service
    try {
        await createUser({
            userName,
            password:doCrypto(password),
            gender
        })
        return new SuccessModel()
    } catch (ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel(registerFailInfo)
    }
}

module.exports = {
    isExist,
    register
}