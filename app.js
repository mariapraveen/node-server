const { createServer } = require('http');
const { parse } = require('url');

const { enableCors, getRequestData  } = require('./lib/helper');
const { createUser, login } = require('./lib/user');

const server = createServer(async (req, res) => {
    enableCors(res);
    if (req.method.toLowerCase() === 'options') {
        res.writeHead(204);
        res.end();
    } else {
        await processMethod(req, res);
    }
});

server.listen(9000);

async function processMethod(req, res) {
    let data = await getRequestData(req);
    let parsedUrl = parse(req.url);
    switch (`${req.method.toLowerCase() + parsedUrl.pathname.toLowerCase()}`) {
        case 'put/create':
            res.end(createUser(JSON.parse(data)));
            break;
        case 'post/login':
            res.end(login(JSON.parse(data)));
            break;
        default:
            res.end();
    }
}


