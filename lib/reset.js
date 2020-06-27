const { readdirSync, unlinkSync, lstatSync, rmdirSync } = require('fs');
const { setProfileData, setProfilePwd, setLatestData } = require('./data');

function resetConfig() {
    let response = { status: undefined, msg: undefined };
    removeDirRec('./data/user');
    setProfileData({});
    setProfilePwd({});
    setLatestData({ postid: [], info: {} })
    response.status = 'success';
    response.msg = 'Resetted Sucessfully';
    return JSON.stringify(response);;
}

function removeDirRec(path) {
    readdirSync(path).forEach((name) => {
        let isDir = lstatSync(`${path}/${name}`).isDirectory();
        if (isDir) {
            removeDirRec(`${path}/${name}`);
            rmdirSync(`${path}/${name}`);
        } else {
            if (name != '.gitkeep') {
                unlinkSync(`${path}/${name}`);
            }
        }
    });
}

module.exports = {
    resetConfig: resetConfig
}