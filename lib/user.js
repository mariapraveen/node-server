const { writeFileSync } = require('fs');

const { getProfileData, getProfilePwd, setProfileData, setProfilePwd } = require('../lib/data');


function signup(req, data) {
    let pwd = Buffer.from(req.headers.authorization.split('Basic ')[1], 'base64').toString()
    let profileData = getProfileData();
    let pwdData = getProfilePwd();
    let response = { status: undefined, msg: undefined };
    if (!profileData[data.username]) {
        profileData[data.username] = {};
        profileData[data.username].name = data.name;
        pwdData[data.username] = pwd;
        setProfileData(profileData);
        setProfilePwd(pwdData);
        writeFileSync(`./data/user/${data.username}.json`, JSON.stringify({}, undefined, 4), 'utf-8');
        response.status = 'success';
        response.msg = { username: data.username, Name: data.name };
        return JSON.stringify(response);;
    } else {
        response.status = 'error';
        response.msg = `${data.username} user already exists`;
        return JSON.stringify(response);
    }
}


function signin(req, data) {
    let pwd = Buffer.from(req.headers.authorization.split('Basic ')[1], 'base64').toString()
    let profileData = getProfileData();
    let pwdData = getProfilePwd();
    let response = { status: undefined, msg: undefined };
    if (profileData[data.username] && pwdData[data.username] === pwd) {
        response.status = 'success';
        response.msg = { username: data.username, Name: profileData[data.username].name };
        return JSON.stringify(response);;
    }
    else {
        response.status = 'error';
        response.msg = 'login failed';
        return JSON.stringify(response);;
    }
}

module.exports = {
    signup: signup,
    signin: signin
}