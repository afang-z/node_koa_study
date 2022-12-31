/**
 * @description json测试
 * @author afang
 */

const server = require('./server')

test('json格式返回数据正确', async()=>{
    const res = await server.get('/json')
    // post请求需要传递参数
    const res1 = await (await server.post('/login')).setEncoding({
        userName:'sadasd',
        password:'123456'
    })
    // toEqual 对比是否一致
    expect(res.Body).toEqual({
        title:'asdas'
    })

})