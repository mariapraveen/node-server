const { mkdirSync } = require('fs');

const { getProfileData, getProfilePwd, setProfileData, setProfilePwd, setUserData } = require('../lib/data');


function signup(req, data) {
    let pwd = Buffer.from(req.headers.authorization.split('Basic ')[1], 'base64').toString()
    let profileData = getProfileData();
    let pwdData = getProfilePwd();
    let response = { status: undefined, msg: undefined };
    if (!profileData[data.username]) {
        profileData[data.username] = {
            name: data.name,
            created: new Date().getTime()
        };
        pwdData[data.username] = pwd;
        setProfileData(profileData);
        setProfilePwd(pwdData);
        mkdirSync(`./data/user/${data.username}`);
        setUserData(`${data.username}/${data.username}`, { postid: [] });
        response.status = 'success';
        response.msg = { username: data.username, Name: data.name };
    } else {
        response.status = 'error';
        response.msg = `${data.username} user already exists`;
    }
    return JSON.stringify(response);
}


function signin(req, data) {
    let pwd = Buffer.from(req.headers.authorization.split('Basic ')[1], 'base64').toString()
    let profileData = getProfileData();
    let pwdData = getProfilePwd();
    let response = { status: undefined, msg: undefined };
    if (profileData[data.username] && pwdData[data.username] === pwd) {
        response.status = 'success';
        response.msg = { username: data.username, name: profileData[data.username].name };
    }
    else {
        response.status = 'error';
        response.msg = 'login failed';
    }
    return JSON.stringify(response);;
}

function userExists(data) {
    let response = { status: undefined, msg: undefined };
    let profileData = getProfileData();
    if (profileData[data.username]) {
        response.status = 'success';
        response.msg = profileData[data.username];
    } else {
        response.status = 'error';
    }
    return JSON.stringify(response);
}

module.exports = {
    signup: signup,
    signin: signin,
    userExists: userExists
}