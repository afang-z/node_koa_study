const router = require('koa-router')()

router.get('/', async(ctx, next)=>{
    await ctx.render('index',{
        title:'asdaasd'
    })
})

router.get('/', async(ctx, next)=>{
    // 为了异步读取模板文件的内容
    await ctx.render('index',{
        title:'asdaasd'
    })
})

module.exports = router