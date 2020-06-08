const { getProfileData } = require('./data');

function retrieveData() {
    let response = { status: undefined, msg: undefined };
    response.status = 'success';
    response.msg = getProfileData();
    return JSON.stringify(response);;
}

module.exports = {
    retrieveData: retrieveData
}