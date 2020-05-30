function enableCors(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
}

function getRequestData(req) {
    let data = '';
    return new Promise((resolve, reject) => {
        req.on('data', (e) => {
            data += e;
        });
        req.on('end', (e) => {
            resolve(data.toString())
        });
        req.on('error', (e) => {
            reject(e)
        });
    });
}

module.exports = {
    getRequestData: getRequestData,
    enableCors: enableCors
}