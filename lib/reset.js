const { readdirSync, unlinkSync } = require('fs');
const { setProfileData, setProfilePwd } = require('./data');

function resetConfig() {
    let response = { status: undefined, msg: undefined };
    readdirSync('./data/user').forEach((fileName) => {
        if (fileName != '.gitkeep')
            unlinkSync(`./data/user/${fileName}`);
    });
    setProfileData({});
    setProfilePwd({});
    response.status = 'success';
    response.msg = 'Resetted Sucessfully';
    return JSON.stringify(response);;
}

module.exports = {
    resetConfig: resetConfig
}