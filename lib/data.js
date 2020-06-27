const { writeFileSync } = require('fs');

function getProfileData() {
    return require('./../data/user.json');
}

function getUserData(path) {
    return require(`./../data/user/${path}.json`);
}

function getLatestData() {
    return require('./../data/latest.json');
}


function getProfilePwd() {
    return require('./../data/pwd.json');
}


function setLatestData(data) {
    writeFileSync('./data/latest.json', JSON.stringify(data, undefined, 4), 'utf-8');
}


function setUserData(path, data) {
    writeFileSync(`./data/user/${path}.json`, JSON.stringify(data, undefined, 4), 'utf-8');
}


function setProfileData(data) {
    writeFileSync('./data/user.json', JSON.stringify(data, undefined, 4), 'utf-8');
}


function setProfilePwd(data) {
    writeFileSync('./data/pwd.json', JSON.stringify(data, undefined, 4), 'utf-8');
}

module.exports = {
    getProfileData: getProfileData,
    setProfileData: setProfileData,
    getUserData: getUserData,
    setUserData: setUserData,
    getLatestData: getLatestData,
    setLatestData: setLatestData,
    getProfilePwd: getProfilePwd,
    setProfilePwd: setProfilePwd
}