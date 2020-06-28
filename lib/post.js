const { getProfileData, getUserData, getLatestData, setLatestData, setProfileData, setUserData } = require('../lib/data');

function addPost(data) {
    let profileData = getProfileData();
    let userProfileData = getUserData(`${data.username}/${data.username}`);
    let latestData = getLatestData();
    let response = { status: undefined, msg: undefined };
    let timeSnap = new Date().getTime();
    let userData = {
        caption: data.caption,
        img: data.img,
        created: timeSnap,
        username: data.username,
        name: profileData[data.username].name
    };
    userProfileData.postid.unshift(timeSnap);
    latestData.postid.unshift(timeSnap);
    latestData.info[timeSnap] = data.username;
    setUserData(`${data.username}/${data.username}`, userProfileData);
    setUserData(`${data.username}/${timeSnap}`, userData);
    setLatestData(latestData);
    response.status = 'success';
    response.msg = userData;
    return JSON.stringify(response);
}

function getPost(data) {
    let latestData = getLatestData();
    let response = { status: undefined, msg: undefined };
    let posts = [];
    for (let i = data.start; i < (data.start + data.count); i++) {
        let id = latestData.postid[i];
        if (id) {
            let profileData = getUserData(`${latestData.info[id]}/${id}`);
            posts.push(profileData)
        }
    }
    response.status = 'success';
    response.msg = posts;
    return JSON.stringify(response);
}

function getUserPost(data) {
    let latestData = getUserData(`${data.username}/${data.username}`);
    let response = { status: undefined, msg: undefined };
    let posts = [];
    for (let i = data.start; i < (data.start + data.count); i++) {
        let id = latestData.postid[i];
        if (id) {
            let profileData = getUserData(`${data.username}/${id}`);
            posts.push(profileData)
        }
    }
    response.status = 'success';
    response.msg = posts;
    return JSON.stringify(response);
}

module.exports = {
    addPost: addPost,
    getPost: getPost,
    getUserPost: getUserPost
}