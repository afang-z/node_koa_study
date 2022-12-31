const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')

const { REDIS_CONf } = require('./conf/db')
const { SESSION_SECRET_KEY } = require('./conf/secretKeys')

// 路由
const indexRouter = require('./routes/index')
const userViewRouter = require('./routes/view/user')
const userApiRouter = require('./routes/api/user')

// error hanlder
onerror(app)

// middlewares
app.use(
    bodyparser({
        enableTypes: ['json', 'form', 'text'],
    })
)
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(
    views(__dirname + '/views', {
        extension: 'ejs',
    })
)


// session配置
app.keys = [SESSION_SECRET_KEY]
app.use(session({
    key: 'weibo.sid', // cookie name 默认是 'koa-sid
    prefix: 'weibo:sess:', // redis key的前缀 默认是：'koa:sess:'
    cookie:{
        path: '/',
        httpOnly: true,
        maxAge: 24*60*60*1000         // 过期时间 ms
    },
    // ttl: 24*60*60*1000 ,        // redis过期时间 ms 默认和上面时间一致
    store: redisStore({
        all: `${REDIS_CONf.host}:${REDIS_CONf.port}`
    })
}))

// router
app.use(indexRouter.routes(), indexRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
