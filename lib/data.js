const { writeFileSync } = require('fs');

function getProfileData() {debugger
    return require('./../data/user.json');
}

function setProfileData(data) {
    writeFileSync('./data/user.json', JSON.stringify(data, undefined, 4), 'utf-8');
}


function getProfilePwd() {
    return require('./../data/pwd.json');
}

function setProfilePwd(data) {
    writeFileSync('./data/pwd.json', JSON.stringify(data, undefined, 4), 'utf-8');
}

module.exports = {
    getProfileData: getProfileData,
    setProfileData: setProfileData,
    getProfilePwd: getProfilePwd,
    setProfilePwd: setProfilePwd
}