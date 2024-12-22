// httpサーバー起動用
const http = require('http')
// リクエスト内のGETパラメタ解析用
const url = require('url')
// datastore接続用
const datastore = require('./connectDatastoreAPI')

async function getEntityByName(req, res) {
    try {
        const param = url.parse(req.url, true).query
        console.log("param: " + param.name)
        const entity = await datastore.getEntity(param.name)
        setResponse(res, entity)
    } catch (e) {
        console.log(e)
    }
}

async function getEntityByLabel(req, res) {
    try {
        const param = url.parse(req.url, true).query
        console.log("param: " + param.label)
        const entity = await datastore.getEntityByLabel(param.label)
        setResponse(res, entity)
    } catch (e) {
        console.log(e)
    }
}

async function getEntityByLocation(req, res) {
    try {
        const param = url.parse(req.url, true).query
        console.log("param: " + param.location)
        const entity = await datastore.getEntityByLocation(param.location)
        setResponse(res, entity)
    } catch (e) {
        console.log(e)
    }
}

function notFound(req, res) {
    res.writeHead(404)
    res.end('Not Found')
}

function setResponse(res, entity) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost")
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify(entity))
    res.end()
}

const server = http.createServer((req, res) => {
    const urlLength = req.url.indexOf('?')
    switch (req.url.substring(0, urlLength)) {
        case '/getEntity':
            getEntityByName(req, res)
            break
        case '/getEntityByLabel':
            getEntityByLabel(req, res)
            break
        case '/getEntityByLocation':
            getEntityByLocation(req, res)
            break
        default:
            notFound(req, res)
    }
})

server.listen(3000)