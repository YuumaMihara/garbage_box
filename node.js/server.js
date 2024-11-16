// httpサーバー起動用
const http = require('http');
// リクエスト内のGETパラメタ解析用
const url = require('url');
// datastore接続用
const datastore = require('./connectDatastoreAPI');

async function getEntityByName(req, res) {
    const param = url.parse(req.url, true).query;
    console.log("param: " + param.name);
    const entity = await datastore.getEntity(param.name);
    setResponse(res, entity);
}

async function getEntityByLabel(req, res) {
    const param = url.parse(req.url, true).query;
    console.log("param: " + param.label);
    const entity = await datastore.getEntityByLabel(param.label);
    setResponse(res, entity);
}

function notFound(req, res) {
    res.writeHead(404);
    res.end('Not Found');
}

function setResponse(res, entity) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost");
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(entity));
    res.end();
}

const server = http.createServer((req, res) => {
    const urlLength = req.url.indexOf('?');
    if (req.url.substring(0, urlLength) === '/getEntity') {
        getEntityByName(req, res);
    } else if(req.url.substring(0, urlLength) === '/getEntityByLabel') {
        getEntityByLabel(req, res);
    } else {
        notFound(req, res);
    }
});

server.listen(3000);