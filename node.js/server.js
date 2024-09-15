// httpサーバー起動用
const http = require('http');
// リクエスト内のGETパラメタ解析用
const url = require('url');
// datastore接続用
const datastore = require('./connectDatastoreAPI');

async function callAPI(req, res) {
    const param = url.parse(req.url, true).query;
    const entity = await datastore.getEntity(param.name);
    res.setHeader("Access-Control-Allow-Origin", "http://localhost");
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(entity));
    res.end();
}

function notFound(req, res) {
    res.writeHead(404);
    res.end('Not Found');
}

const server = http.createServer((req, res) => {
    if (!req.url.indexOf('/getEntity')) {
        callAPI(req, res);
    } else if(!req.url.indexOf('/about')) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(req.url);
    } else {
        notFound(req, res);
    }
});

server.listen(3000);