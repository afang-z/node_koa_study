/**
 * @description json schema 校验
 * @author afang
 */

const Ajv = require('ajv')
const ajv = new Ajv({
    // allErrors: true  // 输出所有的错误(比较慢)
})

/**
 * 
 * @param {Object} schema json schema 规则 
 * @param {object} data 待校验数据
 */
function validate(schema, data){
    const valid = ajv.validate(schema, data)
    if (!valid) {
        return ajv.errors[0]
    }
}

module.exports = validate
