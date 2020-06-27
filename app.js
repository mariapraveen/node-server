const { createServer } = require('http');
const { parse } = require('url');

const { enableCors, getRequestData } = require('./lib/helper');
const { signup, signin } = require('./lib/user');
const { resetConfig } = require('./lib/reset');
const { retrieveData } = require('./lib/retrieve');

const server = createServer(async (req, res) => {
    enableCors(res);
    if (req.method.toLowerCase() === 'options') {
        res.writeHead(204);
        res.end();
    } else {
        res.setHeader('content-type', 'application/json');
        await processMethod(req, res);
    }
});

server.listen(9000);

async function processMethod(req, res) {
    let data = await getRequestData(req);
    let parsedUrl = parse(req.url);
    switch (`${req.method.toLowerCase() + parsedUrl.pathname.toLowerCase()}`) {
        case 'post/signup':
            res.end(signup(req, JSON.parse(data)));
            break;
        case 'post/signin':
            res.end(signin(req, JSON.parse(data)));
            break;
        case 'post/reset':
            res.end(resetConfig());
            break;
        case 'post/retreive':
            res.end(retrieveData());
            break;
        default:
            res.end();
    }
}


