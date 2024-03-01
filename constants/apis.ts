const homeUrl = 'https://bosnett.com/';

enum Apis {
    friendsApi = `${homeUrl}wp-json/buddyboss/v1/members`,
    groupsApi = `${homeUrl}wp-json/custom/v1/groups`,
    loginApi = `${homeUrl}api/public/api/login`,
    signupApi = `${homeUrl}api/public/api/signup`,
    profileApi = `${homeUrl}api/public/api/profile`,
    newsFeedApi = `${homeUrl}wp-json/buddyboss/v1/activity`,
    logoutApi = `${homeUrl}api/public/api/logout`
}

export default Apis