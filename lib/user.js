const { writeFileSync } = require('fs');

const { getProfileData, getProfilePwd, setProfileData, setProfilePwd } = require('../lib/data');


function createUser(data) {
    let profileData = getProfileData();
    let pwdData = getProfilePwd();
    if (!profileData[data.username]) {
        profileData[data.username] = {};
        profileData[data.username].name = data.name;
        pwdData[data.username] = data.pwd;
        setProfileData(profileData);
        setProfilePwd(pwdData);
        writeFileSync(`./data/${data.username}.json`, JSON.stringify({}, undefined, 4), 'utf-8');
        return 'success';
    } else {
        return 'already exists';
    }
}


function login(data) {
    let profileData = getProfileData();
    let pwdData = getProfilePwd();
    if (profileData[data.username] && pwdData[data.username] === data.pwd) {
        return 'success';
    }
    else {
        return 'error';
    }
}

module.exports = {
    createUser: createUser,
    login: login
}